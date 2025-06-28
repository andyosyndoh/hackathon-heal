const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization required' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }

    const { path } = event;
    const body = event.body ? JSON.parse(event.body) : {};

    if (path.includes('/chat/message') && event.httpMethod === 'POST') {
      const { sessionId, content, messageType = 'text' } = body;
      
      // Create or get session
      let session;
      if (sessionId) {
        const { data: existingSession } = await supabase
          .from('chat_sessions')
          .select('*')
          .eq('id', sessionId)
          .eq('user_id', user.id)
          .single();
        session = existingSession;
      }

      if (!session) {
        const { data: newSession, error: sessionError } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: user.id,
            title: `Chat Session - ${new Date().toLocaleDateString()}`
          })
          .select()
          .single();

        if (sessionError) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create session' })
          };
        }
        session = newSession;
      }

      // Save user message
      const { data: userMessage, error: userMsgError } = await supabase
        .from('chat_messages')
        .insert({
          session_id: session.id,
          user_id: user.id,
          content,
          sender_type: 'user',
          message_type: messageType
        })
        .select()
        .single();

      if (userMsgError) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to save message' })
        };
      }

      // Generate AI response (simplified)
      const aiResponses = [
        "I understand how you're feeling. It takes courage to share what's on your mind.",
        "Thank you for opening up to me. Your feelings are completely valid.",
        "I'm here to listen without judgment. You're not alone in this.",
        "That sounds really difficult to deal with. What would help you feel more supported?",
        "I appreciate you trusting me with your feelings. How can I best support you right now?"
      ];
      const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      // Save AI message
      const { data: aiMessage, error: aiMsgError } = await supabase
        .from('chat_messages')
        .insert({
          session_id: session.id,
          user_id: user.id,
          content: aiResponse,
          sender_type: 'ai',
          message_type: 'text'
        })
        .select()
        .single();

      if (aiMsgError) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to save AI response' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          session,
          userMessage,
          aiMessage,
          response: aiResponse
        })
      };
    }

    if (path.includes('/chat/sessions') && event.httpMethod === 'GET') {
      const { data: sessions, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch sessions' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ sessions })
      };
    }

    if (path.includes('/chat/history') && event.httpMethod === 'GET') {
      const sessionId = event.queryStringParameters?.session_id;
      
      if (!sessionId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'session_id required' })
        };
      }

      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch messages' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ messages })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};