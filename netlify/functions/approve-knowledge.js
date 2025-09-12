import { createClient } from "@supabase/supabase-js";

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { id, approved } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from("knowledge_library")
      .update({ approved })
      .eq("id", id);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
