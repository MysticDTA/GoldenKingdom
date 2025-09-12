import { createClient } from '@supabase/supabase-js';

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async () => {
  try {
    const { data, error } = await supabase
      .from("knowledge_library")
      .select("*")
      .eq("approved", true)
      .order("id", { ascending: false });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
