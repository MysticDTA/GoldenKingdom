const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event, context) => {
  try {
    const user = context.clientContext && context.clientContext.user;
    if (!user || !user.app_metadata.roles.includes('admin')) {
      return { statusCode: 403, body: 'Forbidden' };
    }

    const { id } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('knowledge_submissions')
      .update({ approved: true })
      .eq('id', id);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
