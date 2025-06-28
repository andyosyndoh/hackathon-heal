const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join('/tmp', 'heal.db');
let db;

function initDatabase() {
  if (!db) {
    db = new Database(dbPath);
    
    // Create chat tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        content TEXT NOT NULL,
        sender_type TEXT NOT NULL,
        message_type TEXT DEFAULT 'text',
        metadata TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
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

function getAIResponse(message) {
  // Simple AI response simulation
  const responses = [
    "I understand how you're feeling. It takes courage to share what's on your mind. Can you tell me more about what's been bothering you?",
    "Thank you for opening up to me. Your feelings are completely valid. What would help you feel more supported right now?",
    "I'm here to listen without judgment. It sounds like you're going through a challenging time. How long have you been feeling this way?",
    "That sounds really difficult to deal with. You're not alone in this. What coping strategies have you tried before?",
    "I appreciate you trusting me with your feelings. Sometimes talking through our thoughts can help us process them better. What's one small thing that might help you feel a bit better today?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

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
    const { sessionId, content, messageType = 'text' } = JSON.parse(event.body);

    if (!content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message content is required' })
      };
    }

    // Initialize database
    const database = initDatabase();
    const now = new Date().toISOString();

    // Get or create session
    let session;
    if (sessionId) {
      session = database.prepare('SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?').get(sessionId, userId);
    }

    if (!session) {
      const newSessionId = sessionId || uuidv4();
      const title = `Chat Session - ${new Date().toLocaleDateString()}`;
      
      database.prepare(`
        INSERT INTO chat_sessions (id, user_id, title, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `).run(newSessionId, userId, title, now, now);

      session = { id: newSessionId, user_id: userId, title, created_at: now, updated_at: now };
    }

    // Save user message
    const userMessageId = uuidv4();
    database.prepare(`
      INSERT INTO chat_messages (id, session_id, user_id, content, sender_type, message_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userMessageId, session.id, userId, content, 'user', messageType, now);

    // Get AI response
    const aiResponse = getAIResponse(content);

    // Save AI message
    const aiMessageId = uuidv4();
    database.prepare(`
      INSERT INTO chat_messages (id, session_id, user_id, content, sender_type, message_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(aiMessageId, session.id, userId, aiResponse, 'ai', 'text', now);

    // Update session timestamp
    database.prepare('UPDATE chat_sessions SET updated_at = ? WHERE id = ?').run(now, session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        session: {
          id: session.id,
          userId: session.user_id,
          title: session.title,
          createdAt: session.created_at,
          updatedAt: now
        },
        userMessage: {
          id: userMessageId,
          content,
          senderType: 'user',
          messageType,
          createdAt: now
        },
        aiMessage: {
          id: aiMessageId,
          content: aiResponse,
          senderType: 'ai',
          messageType: 'text',
          createdAt: now
        },
        response: aiResponse
      })
    };

  } catch (error) {
    console.error('Chat message error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};