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

async function getGeminiAIResponse(message) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('Gemini API key not configured, using fallback responses');
    return getFallbackResponse(message);
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a compassionate AI mental health companion named Heal. Your role is to:

1. Provide empathetic, supportive responses to users experiencing mental health challenges
2. Use active listening techniques and validate emotions
3. Offer evidence-based coping strategies when appropriate
4. Maintain professional boundaries while being warm and understanding
5. Recognize crisis situations and guide users to professional help
6. Never provide medical diagnoses or replace professional therapy
7. Keep responses conversational, supportive, and under 150 words
8. Use person-first language and avoid stigmatizing terms

If a user expresses thoughts of self-harm or suicide, immediately provide crisis resources and encourage them to seek professional help.

Remember: You're here to support, not to diagnose or treat. Always encourage professional help when needed.

User message: ${message}

Please respond with empathy and support:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      return getFallbackResponse(message);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected Gemini API response structure:', data);
      return getFallbackResponse(message);
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getFallbackResponse(message);
  }
}

function getFallbackResponse(message) {
  // Crisis detection keywords
  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm', 'die', 'death'];
  const lowerMessage = message.toLowerCase();
  
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return "I'm really concerned about what you're sharing with me. Your life has value, and there are people who want to help. Please reach out to a crisis helpline immediately: Call 988 (Suicide & Crisis Lifeline) or text 'HELLO' to 741741. You don't have to go through this alone.";
  }

  // Contextual responses based on message content
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    return "I hear that you're feeling anxious, and that can be really overwhelming. Anxiety is your body's way of trying to protect you, but I understand it doesn't feel helpful right now. Have you tried any grounding techniques like the 5-4-3-2-1 method? Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.";
  }

  if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad')) {
    return "Thank you for sharing how you're feeling with me. Depression can make everything feel heavy and difficult, and it takes courage to reach out. Your feelings are valid, and you're not alone in this. Even small steps matter - have you been able to do anything today that brought you even a tiny bit of comfort?";
  }

  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
    return "It sounds like you're carrying a lot right now, and feeling overwhelmed is completely understandable. When we're stressed, everything can feel urgent and impossible to manage. Let's try to break things down - what's one small thing you could do today to take care of yourself?";
  }

  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
    return "Feeling lonely can be one of the most painful experiences, and I want you to know that reaching out here shows real strength. Even though it might not feel like it, you're not truly alone - there are people who care, including me. What's one small way you might connect with someone today, even briefly?";
  }

  // Default supportive responses
  const responses = [
    "I understand how you're feeling. It takes courage to share what's on your mind. Can you tell me more about what's been bothering you?",
    "Thank you for opening up to me. Your feelings are completely valid. What would help you feel more supported right now?",
    "I'm here to listen without judgment. It sounds like you're going through a challenging time. How long have you been feeling this way?",
    "That sounds really difficult to deal with. You're not alone in this. What coping strategies have you tried before?",
    "I appreciate you trusting me with your feelings. Sometimes talking through our thoughts can help us process them better. What's one small thing that might help you feel a bit better today?",
    "Your feelings matter, and I'm glad you're sharing them with me. It's okay to not be okay sometimes. What kind of support feels most helpful to you right now?",
    "I can hear that this is weighing on you. Thank you for being vulnerable with me. What's been the hardest part about what you're going through?",
    "It sounds like you're dealing with a lot. I want you to know that seeking support is a sign of strength, not weakness. How can I best support you in this moment?"
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

    if (!content || content.trim() === '') {
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
      console.log('Created new chat session:', session.id);
    }

    // Save user message first
    const userMessageId = uuidv4();
    const userMessage = {
      id: userMessageId,
      session_id: session.id,
      user_id: userId,
      content: content.trim(),
      sender_type: 'user',
      message_type: messageType,
      metadata: '{}',
      created_at: now
    };

    db.createChatMessage(userMessage);
    console.log('Saved user message:', userMessageId);

    // Get AI response using Gemini API
    console.log('Generating AI response for message:', content.substring(0, 50) + '...');
    const aiResponse = await getGeminiAIResponse(content.trim());
    console.log('Generated AI response:', aiResponse.substring(0, 50) + '...');

    // Save AI message
    const aiMessageId = uuidv4();
    const aiMessage = {
      id: aiMessageId,
      session_id: session.id,
      user_id: userId,
      content: aiResponse,
      sender_type: 'ai',
      message_type: 'text',
      metadata: JSON.stringify({
        model: 'gemini-1.5-flash',
        timestamp: now,
        user_message_id: userMessageId
      }),
      created_at: now
    };

    db.createChatMessage(aiMessage);
    console.log('Saved AI message:', aiMessageId);

    // Update session timestamp
    db.updateChatSession(session.id, { updated_at: now });

    // Return response
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
          content: content.trim(),
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
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      })
    };
  }
};