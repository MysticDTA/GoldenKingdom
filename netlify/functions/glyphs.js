const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, '../../glyphs.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const glyphs = JSON.parse(data);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(glyphs.glyphs)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sanctuary unreadable' })
    };
  }
};
