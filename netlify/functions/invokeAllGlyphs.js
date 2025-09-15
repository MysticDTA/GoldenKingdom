exports.handler = async () => {
  const chakra = require('../../public/chakraGlyph.json');
  const ignis = require('../../public/IgnisVow.json');

  return {
    statusCode: 200,
    body: JSON.stringify({
      glyphs: [chakra, ignis],
      timestamp: new Date().toISOString()
    })
  };
};
