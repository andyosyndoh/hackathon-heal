const jwt = require('jsonwebtoken');
const db = require('./shared-db');

function verifyToken(token) {
  const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}

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
    // Verify authentication
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization header required' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    // Parse query parameters
    const filters = {
      category: event.queryStringParameters?.category || '',
      type: event.queryStringParameters?.type || '',
      difficulty: event.queryStringParameters?.difficulty || '',
      limit: parseInt(event.queryStringParameters?.limit || '20'),
      offset: parseInt(event.queryStringParameters?.offset || '0')
    };

    const resources = db.getResources(filters);

    const formattedResources = resources.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      content: resource.content,
      type: resource.type,
      category: resource.category,
      difficulty: resource.difficulty,
      durationMinutes: resource.duration_minutes,
      rating: resource.rating,
      featured: resource.featured,
      createdAt: resource.created_at,
      updatedAt: resource.updated_at
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ resources: formattedResources })
    };

  } catch (error) {
    console.error('Resources error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};