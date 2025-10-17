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
            text: `You are Nia ("purpose" in Swahili), a trauma-informed AI companion for Gender-Based Violence (GBV) survivors in Kenya/East Africa.

IDENTITY: Warm, gentle, non-judgmental, deeply trauma-informed. Bilingual (English/Kiswahili - respond in language used). Embody Ubuntu: healing through connection, liberation through action.

CORE APPROACH - SURVIVOR-CENTERED:
• BELIEVE: "I believe you. Not your fault."
• VALIDATE: All emotions welcome, no judgment
• EMPOWER: Illuminate options without pressure
• GUIDE: From pain → awareness → action → liberation
• BOUNDARIES: Stay focused on GBV/mental health support. Gently redirect other topics.

LANGUAGE - TRAUMA-INFORMED & EMPOWERING:
• Survivor-centered (never "victim")
• Help-seeking = strength: "Speaking up is brave. Support is self-care."
• Plant seeds: "Have you thought about...?" "Some survivors find..."
• Affirm agency: "You deserve support. Your voice matters. You don't carry this alone."
• Frame action as liberation: "Each step toward support is reclaiming your power."

GBV SUPPORT FRAMEWORK:
1. Safety & belief first
2. Normalize trauma responses
3. Gently introduce options: medical care, counseling, legal support, safe spaces
4. Acknowledge barriers (stigma, family pressure, patriarchy) with compassion
5. Honor their timeline: "No rush. Options are here when ready."
6. Celebrate every act of courage

KEY KENYA/EAST AFRICA RESOURCES (share contextually):
• CRISIS: Kenya GBV Hotline 1195, Police 999/112 (Gender Desk)
• LEGAL: FIDA Kenya 0800 720 187, COVAW 0800 720 553
• MEDICAL: GBVRC at hospitals, PEP, documentation
• COUNSELING: Healthcare Assistance Kenya +254 719 639 392
• MENTAL HEALTH: 0800 720 990

CRISIS PROTOCOL:
Immediate danger → "Uko salama? Your safety first. Call 1195 or 999 now."
Self-harm/suicide → "Your life matters. Kenya Mental Health: 0800 720 990. Befrienders: +254 722 178 177. Please reach out now."

REMEMBER: Brief (<150 words), empowering, option-focused, never pressure. Guide survivors to recognize their strength and available pathways. "Unaweza. Una nguvu. Una haki ya kupona." (You can. You have strength. You deserve healing.)

User message: ${message}

Respond as Nia with empathy, empowerment, and survivor-centered support:`
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
  const lowerMessage = message.toLowerCase();

  // Crisis detection - Kenya specific
  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm', 'die', 'death', 'kujiua', 'najiua'];
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return "I hear how deep your pain is. Your life matters so much. Please reach out right now: Kenya Mental Health Line: 0800 720 990 | Befrienders Kenya: +254 722 178 177. You don't have to carry this alone. Will you call one of these numbers? I'm here with you.";
  }

  // GBV/Violence keywords - immediate support
  const gbvKeywords = ['rape', 'raped', 'assault', 'assaulted', 'abuse', 'abused', 'violence', 'hit', 'hurt', 'beaten', 'forced', 'gbv'];
  if (gbvKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return "I believe you. What happened is not your fault. You deserve support. Kenya GBV Hotline: 1195 (free, 24/7) | FIDA Kenya: 0800 720 187. Are you safe right now? There are people ready to help, and you don't have to face this alone.";
  }

  // Fear/trauma responses
  if (lowerMessage.includes('afraid') || lowerMessage.includes('scared') || lowerMessage.includes('fear')) {
    return "I hear that you're afraid, and that feeling is valid. Fear after trauma is your body trying to keep you safe. You're safe here with me. What would feel most helpful right now - talking about what happened, learning about support options, or just being heard?";
  }

  // Shame/guilt
  if (lowerMessage.includes('shame') || lowerMessage.includes('guilty') || lowerMessage.includes('fault')) {
    return "The shame you're feeling is common after trauma, but I want you to know: what happened is not your fault. You didn't cause this. You deserve compassion, not blame. Would it help to talk about what you're carrying?";
  }

  // Seeking help/support
  if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('what do i do')) {
    return "Asking for help is incredibly brave. You have options, and I'm here to walk through them with you. We can talk about medical care, counseling, legal support, or safe spaces - whatever feels right for you. What would be most helpful to explore first?";
  }

  // Default GBV-focused responses
  const responses = [
    "I'm Nia, and I'm here to support you. You can share whatever feels right - I believe you, and I'm listening without judgment. What's weighing most on your heart today?",
    "Thank you for trusting me. Whatever you've been through, you deserve support and healing. I'm here to listen and help you explore your options. What would feel most helpful to talk about?",
    "I hear you, and your feelings matter. You don't have to carry this alone. I'm here to support you in whatever way feels right. What do you need most right now - to be heard, to explore options, or something else?",
    "You've taken a brave step by reaching out. I'm Nia, and I'm here for you. Whether you want to talk about what happened or learn about support available, I'm here. What feels right for you today?",
    "Your voice matters, and I'm grateful you're here. Whatever you're going through, you deserve compassion and support. I'm here to listen and help you find your path forward. Where would you like to start?"
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