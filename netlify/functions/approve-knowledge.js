import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function handler(event) {
  try {
    const { id } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('submissions')
      .update({ approved: true })
      .eq('id', id);

    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true, data }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
