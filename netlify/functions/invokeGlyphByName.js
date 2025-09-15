const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const glyphName = event.queryStringParameters.name;

  if (!glyphName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing glyph name." })
    };
  }

  const filePath = path.resolve(__dirname, `../../public/${glyphName}.json`);

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      body: data
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: `Glyph '${glyphName}' not found.` })
    };
  }
};
