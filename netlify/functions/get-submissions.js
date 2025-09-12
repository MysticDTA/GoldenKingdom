import { createClient } from '@supabase/supabase-js';

export const handler = async (event, context) => {
  try {
    // 🔑 Use environment variables (set in Netlify dashboard)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    // 📖 Fetch all submissions from "knowledge_entries" table
    const { data, error } = await supabase
      .from('knowledge_entries')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
