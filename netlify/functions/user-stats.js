const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join('/tmp', 'heal.db');
let db;

function initDatabase() {
  if (!db) {
    try {
      db = new Database(dbPath);
      
      // Create mood_logs table if it doesn't exist
      db.exec(`
        CREATE TABLE IF NOT EXISTS mood_logs (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          mood_score INTEGER NOT NULL,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (error) {
      console.error('Database initialization error:', error);
      db = new Database(':memory:');
      db.exec(`
        CREATE TABLE mood_logs (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          mood_score INTEGER NOT NULL,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
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

    // Initialize database
    const database = initDatabase();

    // Get total sessions
    const totalSessionsResult = database.prepare('SELECT COUNT(*) as count FROM chat_sessions WHERE user_id = ?').get(userId);
    const totalSessions = totalSessionsResult ? totalSessionsResult.count : 0;

    // Get average mood score from last 30 days
    const moodResult = database.prepare(`
      SELECT AVG(mood_score) as avg_mood 
      FROM mood_logs 
      WHERE user_id = ? AND created_at > datetime('now', '-30 days')
    `).get(userId);
    const moodScore = moodResult && moodResult.avg_mood ? moodResult.avg_mood : 0;

    // Get days active (simplified)
    const daysActiveResult = database.prepare(`
      SELECT COUNT(DISTINCT DATE(created_at)) as days
      FROM chat_sessions 
      WHERE user_id = ?
    `).get(userId);
    const daysActive = daysActiveResult ? daysActiveResult.days : 0;

    // Calculate current streak (simplified - consecutive days with activity)
    const currentStreak = Math.min(daysActive, 7); // Cap at 7 for demo

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        currentStreak,
        totalSessions,
        moodScore: parseFloat(moodScore.toFixed(1)),
        resourcesViewed: 0, // Placeholder
        daysActive
      })
    };

  } catch (error) {
    console.error('User stats error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};