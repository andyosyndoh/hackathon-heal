const jwt = require('jsonwebtoken');
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
    const { email, password } = JSON.parse(event.body);

    // Validation
    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }

    // Get user by email
    console.log('Attempting to find user with email:', email);
    const user = db.findUserByEmail(email);

    if (!user) {
      console.error('Login failed: No user found for email:', email);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    console.log('User found:', JSON.stringify(user, null, 2));

    // Make sure the password field matches your DB
    const plainTextPassword = user.password;
    if (!plainTextPassword) {
      console.error('Login failed: User object is missing "password" field.', user);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'User record is missing password' })
      };
    }

    // Verify password
    console.log('Comparing provided password:', password);
    console.log('With stored password:', plainTextPassword);
    const isValidPassword = password === plainTextPassword;
    if (!isValidPassword) {
      console.error('Login failed: Password mismatch.');
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    // Generate JWT tokens
    const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    const accessToken = jwt.sign({ user_id: user.id }, jwtSecret, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ user_id: user.id, type: 'refresh' }, jwtSecret, { expiresIn: '7d' });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name || user.firstName,
          lastName: user.last_name || user.lastName,
          emailVerified: user.email_verified ?? true,
          createdAt: user.created_at || user.createdAt,
          updatedAt: user.updated_at || user.updatedAt
        },
        accessToken,
        refreshToken
      })
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};