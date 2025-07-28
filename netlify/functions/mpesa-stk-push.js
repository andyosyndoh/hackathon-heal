const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { phoneNumber, amount, category, message } = JSON.parse(event.body);

    if (!phoneNumber || !amount) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Phone number and amount are required' })
      };
    }

    // Get access token first
    const authResponse = await fetch(`${process.env.URL}/.netlify/functions/mpesa-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const authData = await authResponse.json();
    if (!authData.access_token) {
      throw new Error('Failed to get access token');
    }

    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
    
    const businessShortCode = process.env.MPESA_SHORTCODE || '174379';
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL || `${process.env.URL}/.netlify/functions/mpesa-callback`;

    if (!passkey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'M-Pesa passkey not configured' })
      };
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');

    // Format phone number to international format
    const formattedPhone = phoneNumber.startsWith('254') 
      ? phoneNumber 
      : phoneNumber.replace(/^0/, '254');

    const payload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: parseInt(amount),
      PartyA: formattedPhone,
      PartyB: businessShortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: `HEAL-${(category || 'DONATION').toUpperCase()}`,
      TransactionDesc: message || `Donation for ${category || 'mental health'}`
    };

    console.log('STK Push payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('STK Push response:', JSON.stringify(result, null, 2));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: result.ResponseCode === '0',
        checkoutRequestId: result.CheckoutRequestID,
        merchantRequestId: result.MerchantRequestID,
        message: result.ResponseDescription,
        customerMessage: result.CustomerMessage
      })
    };
  } catch (error) {
    console.error('M-Pesa STK Push error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to initiate M-Pesa payment',
        details: error.message 
      })
    };
  }
};
