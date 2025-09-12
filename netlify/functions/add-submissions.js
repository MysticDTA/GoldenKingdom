import { createClient } from '@supabase/supabase-js';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    // Parse the body sent from frontend
    const body = JSON.parse(event.body);
    const { title, author, content } = body;

    if (!title || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Title and content are required' })
      };
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('knowledge_entries')
      .insert([{ title, author, content }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
      headers: { "Access-Control-Allow-Origin": "*" }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
