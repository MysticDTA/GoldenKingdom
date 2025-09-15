// netlify/functions/filterGlyphs.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const filePath = path.join(__dirname, '../../glyphs.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const glyphs = JSON.parse(data).glyphs;

    const { energy, role } = event.queryStringParameters;

    const filtered = glyphs.filter(glyph => {
      return (!energy || glyph.energy === energy) &&
             (!role || glyph.role === role);
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filtered)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sanctuary unreadable' })
    };
  }
};
