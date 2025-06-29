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

function getAIResponse(message) {
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

    const now = new Date().toISOString();

    // Get or create session
    let session;
    if (sessionId) {
      session = db.findChatSession(sessionId, userId);
    }

    if (!session) {
      const newSessionId = sessionId || uuidv4();
      const title = `Chat Session - ${new Date().toLocaleDateString()}`;
      
      session = {
        id: newSessionId,
        user_id: userId,
        title,
        created_at: now,
        updated_at: now
      };

      db.createChatSession(session);
    }

    // Save user message
    const userMessageId = uuidv4();
    const userMessage = {
      id: userMessageId,
      session_id: session.id,
      user_id: userId,
      content,
      sender_type: 'user',
      message_type: messageType,
      created_at: now
    };

    db.createChatMessage(userMessage);

    // Get AI response
    const aiResponse = getAIResponse(content);

    // Save AI message
    const aiMessageId = uuidv4();
    const aiMessage = {
      id: aiMessageId,
      session_id: session.id,
      user_id: userId,
      content: aiResponse,
      sender_type: 'ai',
      message_type: 'text',
      created_at: now
    };

    db.createChatMessage(aiMessage);

    // Update session timestamp
    db.updateChatSession(session.id, { updated_at: now });

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