const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('./shared-db');

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

    // Check if user already exists
    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'User already exists' })
      };
    }

    // Create user
    const userId = uuidv4();
    const now = new Date().toISOString();

    const newUser = {
      id: userId,
      email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email_verified: true,
      created_at: now,
      updated_at: now
    };

    db.createUser(newUser);

    // Create user profile
    const newProfile = {
      user_id: userId,
      preferences: '{}'
    };

    db.createUserProfile(newProfile);

    // Generate JWT tokens
    const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    const accessToken = jwt.sign({ user_id: userId }, jwtSecret, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ user_id: userId, type: 'refresh' }, jwtSecret, { expiresIn: '7d' });

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
          emailVerified: newUser.email_verified,
          createdAt: newUser.created_at,
          updatedAt: newUser.updated_at
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