const db = require('./shared-db');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const debugInfo = db.getDebugInfo();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'debug',
        timestamp: new Date().toISOString(),
        database: debugInfo,
        environment: {
          hasGeminiKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
          hasJwtSecret: !!process.env.JWT_SECRET,
          nodeVersion: process.version
        }
      })
    };

  } catch (error) {
    console.error('Debug error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};