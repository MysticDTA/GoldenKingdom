// netlify/functions/dailySigil.js
const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, '../../glyphs.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const glyphs = JSON.parse(data).glyphs;

    if (!glyphs || glyphs.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No glyphs found in the sanctuary.' })
      };
    }

    const randomIndex = Math.floor(Math.random() * glyphs.length);
    const sigil = glyphs[randomIndex];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sigil,
        message: `🪄 Your daily glyph is '${sigil.role}' — ${sigil.energy} energy, ${sigil.state} state.`
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sanctuary unreadable' })
    };
  }
};
