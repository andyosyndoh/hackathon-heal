const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
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
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
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

    const userId = decoded.user_id;

    if (event.httpMethod === 'POST') {
      // Log mood
      const { moodScore, notes = '' } = JSON.parse(event.body);

      if (!moodScore || moodScore < 1 || moodScore > 10) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Mood score must be between 1 and 10' })
        };
      }

      const logId = uuidv4();
      const now = new Date().toISOString();

      const moodLog = {
        id: logId,
        user_id: userId,
        mood_score: moodScore,
        notes,
        created_at: now
      };

      db.createMoodLog(moodLog);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          id: logId,
          userId,
          moodScore,
          notes,
          createdAt: now
        })
      };

    } else if (event.httpMethod === 'GET') {
      // Get mood history
      const days = parseInt(event.queryStringParameters?.days || '30');

      const logs = db.getUserMoodLogs(userId, days);

      const formattedLogs = logs.map(log => ({
        id: log.id,
        userId: log.user_id,
        moodScore: log.mood_score,
        notes: log.notes,
        createdAt: log.created_at
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ logs: formattedLogs })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Mood endpoint error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};