const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
 // Handle Preflight (OPTIONS) Request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  //Reject Unsupported Methods
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  //try-catch to handle unexpected errors without crashing
  try {
    // Load Credentials and Environment URL,chooses between sandbox and production URLs based on the environment
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';

    // Handle Missing Credentials
    if (!consumerKey || !consumerSecret) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'M-Pesa credentials not configured' })
      };
    }

    //Generate Base64-encoded Auth Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
   // Sends a GET request to request an access token adding the encoded auth as a header.
    const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
      }
    });

    // Parses the JSON response to access access_token, expires_in, etc.
    const data = await response.json();
    
        if (!response.ok){
          console.error('Mpesa API returned error:', data);
          throw new Error('Failed to get M-Pesa access token');
        }
    
    //If token was returned, return it to the frontend/client.
    if (data.access_token) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          access_token: data.access_token,
          expires_in: data.expires_in
        })
      };
    }
    
    throw new Error('Failed to get M-Pesa access token');
  } catch (error) {
    console.error('M-Pesa auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to authenticate with M-Pesa',
        details: error.message 
      })
    };
  }
};