import { createClient } from "@supabase/supabase-js";

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  try {
    const { title, content, author } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('knowledge_library')
      .insert([{ title, content, author, approved: false }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
