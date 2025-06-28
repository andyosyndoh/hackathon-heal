const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join('/tmp', 'heal.db');
let db;

function initDatabase() {
  if (!db) {
    db = new Database(dbPath);
  }
  return db;
}

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

    const userId = decoded.user_id;
    const sessionId = event.queryStringParameters?.session_id;
    const limit = parseInt(event.queryStringParameters?.limit || '50');
    const offset = parseInt(event.queryStringParameters?.offset || '0');

    if (!sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'session_id is required' })
      };
    }

    // Initialize database
    const database = initDatabase();

    // Verify session belongs to user
    const session = database.prepare('SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?').get(sessionId, userId);
    if (!session) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Session not found or access denied' })
      };
    }

    // Get messages
    const messages = database.prepare(`
      SELECT id, session_id, user_id, content, sender_type, message_type, 
             COALESCE(metadata, '{}') as metadata, created_at
      FROM chat_messages
      WHERE session_id = ?
      ORDER BY created_at ASC
      LIMIT ? OFFSET ?
    `).all(sessionId, limit, offset);

    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      sessionId: msg.session_id,
      userId: msg.user_id,
      content: msg.content,
      senderType: msg.sender_type,
      messageType: msg.message_type,
      metadata: msg.metadata,
      createdAt: msg.created_at
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ messages: formattedMessages })
    };

  } catch (error) {
    console.error('Chat history error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};