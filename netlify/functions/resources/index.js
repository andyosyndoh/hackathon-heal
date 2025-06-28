const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join('/tmp', 'heal.db');
let db;

function initDatabase() {
  if (!db) {
    db = new Database(dbPath);
    
    // Create resources table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS resources (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        duration_minutes INTEGER,
        rating REAL DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert sample resources if table is empty
    const count = db.prepare('SELECT COUNT(*) as count FROM resources').get();
    if (count.count === 0) {
      insertSampleResources(db);
    }
  }
  return db;
}

function insertSampleResources(database) {
  const resources = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
      content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can significantly impact your daily life. This comprehensive guide covers the different types of anxiety disorders, common symptoms like racing thoughts and physical tension, and practical coping strategies including breathing exercises, grounding techniques, and cognitive behavioral therapy approaches.',
      type: 'article',
      category: 'anxiety',
      difficulty: 'beginner',
      duration_minutes: 15,
      rating: 4.8,
      featured: true
    },
    {
      id: '2',
      title: 'Guided Meditation for Depression',
      description: 'A 20-minute guided meditation specifically designed for managing depressive symptoms.',
      content: 'This meditation focuses on self-compassion and gentle awareness, helping you navigate difficult emotions with kindness. The session includes breathing exercises, body awareness, and loving-kindness practices specifically tailored for those experiencing depression.',
      type: 'audio',
      category: 'depression',
      difficulty: 'beginner',
      duration_minutes: 20,
      rating: 4.9,
      featured: true
    },
    {
      id: 'kenya-befrienders',
      title: 'Befrienders Kenya',
      description: 'Provides emotional support to those in distress through confidential listening.',
      content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. Call: +254 722 178 177 for free confidential support.',
      type: 'contact',
      category: 'Crisis Support',
      difficulty: 'Easy',
      duration_minutes: 5,
      rating: 4.8,
      featured: true
    }
  ];

  const stmt = database.prepare(`
    INSERT INTO resources (id, title, description, content, type, category, difficulty, duration_minutes, rating, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const resource of resources) {
    stmt.run(
      resource.id,
      resource.title,
      resource.description,
      resource.content,
      resource.type,
      resource.category,
      resource.difficulty,
      resource.duration_minutes,
      resource.rating,
      resource.featured
    );
  }
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

    // Initialize database
    const database = initDatabase();

    // Parse query parameters
    const category = event.queryStringParameters?.category || '';
    const type = event.queryStringParameters?.type || '';
    const difficulty = event.queryStringParameters?.difficulty || '';
    const limit = parseInt(event.queryStringParameters?.limit || '20');
    const offset = parseInt(event.queryStringParameters?.offset || '0');

    // Build query
    let query = `
      SELECT id, title, description, content, type, category, difficulty, 
             duration_minutes, rating, featured, created_at, updated_at
      FROM resources
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (type && type !== 'all') {
      query += ' AND type = ?';
      params.push(type);
    }

    if (difficulty && difficulty !== 'all') {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }

    query += ' ORDER BY featured DESC, rating DESC, created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const resources = database.prepare(query).all(...params);

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