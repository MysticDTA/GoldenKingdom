const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const API = "https://api.netlify.com/api/v1/sites/87ef864e-40c3-4782-9b00-cdfa296e2ab8/forms";
    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
    });

    const forms = await resp.json();

    const knowledgeForm = forms.find(f => f.name === "knowledge-form");

    if (!knowledgeForm) {
      return { statusCode: 404, body: "Form not found" };
    }

    const subResp = await fetch(
      `https://api.netlify.com/api/v1/forms/${knowledgeForm.id}/submissions`,
      {
        headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
      }
    );

    const submissions = await subResp.json();

    return {
      statusCode: 200,
      body: JSON.stringify(
        submissions.map(s => ({
          title: s.data.title,
          content: s.data.content,
          link: s.data.link,
          created_at: s.created_at
        }))
      )
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
