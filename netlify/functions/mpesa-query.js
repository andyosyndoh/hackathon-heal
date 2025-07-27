const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

//Mpesa query function
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
    const { checkoutRequestId } = JSON.parse(event.body);

    if (!checkoutRequestId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Checkout request ID is required' })
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

    if (!passkey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'M-Pesa passkey not configured' })
      };
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');

    const payload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };

    const response = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: result.ResultCode === '0',
        resultCode: result.ResultCode,
        resultDesc: result.ResultDesc,
        checkoutRequestId: result.CheckoutRequestID
      })
    };
  } catch (error) {
    console.error('M-Pesa query error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to query M-Pesa transaction',
        details: error.message 
      })
    };
  }
};