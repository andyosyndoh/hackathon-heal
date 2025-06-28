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
    const { path } = event;
    const body = event.body ? JSON.parse(event.body) : {};

    if (path.includes('/auth/register')) {
      const { email, password, firstName, lastName } = body;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: error.message })
        };
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          user: data.user,
          accessToken: data.session?.access_token,
          refreshToken: data.session?.refresh_token
        })
      };
    }

    if (path.includes('/auth/login')) {
      const { email, password } = body;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: error.message })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          user: data.user,
          accessToken: data.session?.access_token,
          refreshToken: data.session?.refresh_token
        })
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