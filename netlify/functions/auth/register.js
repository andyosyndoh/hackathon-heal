const bcrypt = require('bcryptjs');
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
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email_verified BOOLEAN DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id TEXT PRIMARY KEY,
        avatar_url TEXT,
        phone TEXT,
        date_of_birth DATE,
        emergency_contact_name TEXT,
        emergency_contact_phone TEXT,
        preferences TEXT DEFAULT '{}',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  }
  return db;
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
    const { email, password, confirmPassword, firstName, lastName } = JSON.parse(event.body);

    // Validation
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    if (password !== confirmPassword) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Passwords do not match' })
      };
    }

    if (password.length < 8) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Password must be at least 8 characters' })
      };
    }

    // Initialize database
    const database = initDatabase();

    // Check if user already exists
    const existingUser = database.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'User already exists' })
      };
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const userId = uuidv4();
    const now = new Date().toISOString();

    database.prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, email_verified, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, email, passwordHash, firstName, lastName, true, now, now);

    // Create user profile
    database.prepare(`
      INSERT INTO user_profiles (user_id, preferences)
      VALUES (?, ?)
    `).run(userId, '{}');

    // Get created user
    const user = database.prepare(`
      SELECT id, email, first_name, last_name, email_verified, created_at, updated_at
      FROM users WHERE id = ?
    `).get(userId);

    // Generate JWT tokens
    const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    const accessToken = jwt.sign({ user_id: userId }, jwtSecret, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ user_id: userId, type: 'refresh' }, jwtSecret, { expiresIn: '7d' });

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          emailVerified: user.email_verified,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        },
        accessToken,
        refreshToken
      })
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};