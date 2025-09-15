const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const publicPath = path.resolve(__dirname, '../../public');

  try {
    const files = fs.readdirSync(publicPath);
    const glyphs = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));

    return {
      statusCode: 200,
      body: JSON.stringify({
        glyphs,
        count: glyphs.length,
        timestamp: new Date().toISOString()
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to read glyphs." })
    };
  }
};
