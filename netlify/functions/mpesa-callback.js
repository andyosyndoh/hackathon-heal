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

  try {
    const callbackData = JSON.parse(event.body);
    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    // Process the callback data
    const { Body } = callbackData;
    const { stkCallback } = Body;

    if (stkCallback) {
      const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;
      
      // Store transaction result in your database
      // You can implement this based on your database structure
      
      if (ResultCode === 0) {
        // Payment successful
        console.log('Payment successful:', {
          merchantRequestId: MerchantRequestID,
          checkoutRequestId: CheckoutRequestID,
          resultDesc: ResultDesc
        });
        
        // Extract payment details if available
        if (stkCallback.CallbackMetadata && stkCallback.CallbackMetadata.Item) {
          const metadata = {};
          stkCallback.CallbackMetadata.Item.forEach(item => {
            metadata[item.Name] = item.Value;
          });
          
          console.log('Payment metadata:', metadata);
          // Store: Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber
        }
      } else {
        // Payment failed
        console.log('Payment failed:', {
          merchantRequestId: MerchantRequestID,
          checkoutRequestId: CheckoutRequestID,
          resultCode: ResultCode,
          resultDesc: ResultDesc
        });
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Callback processed successfully' })
    };
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process callback' })
    };
  }
};