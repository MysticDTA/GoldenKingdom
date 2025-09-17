// netlify/functions/submit-knowledge.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { title, author, content } = JSON.parse(event.body);

    if (!title || !author || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('knowledge_library')
      .insert([{ title, author, content, approved: false }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission received', data }),
    };
  } catch (err) {
    console.error('Error submitting knowledge:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit knowledge' }),
    };
  }
}
