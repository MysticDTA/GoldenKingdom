import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // secure key
const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { title, content, author } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from("knowledge")
      .insert([{ title, content, author, approved: false }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Submission received for review." }),
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
  }
}
