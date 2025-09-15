const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const publicPath = path.resolve(__dirname, '../../public');

  try {
    const files = fs.readdirSync(publicPath);
    const glyphFiles = files.filter(file => file.endsWith('.json'));

    const manifest = glyphFiles.map(file => {
      const data = fs.readFileSync(path.join(publicPath, file), 'utf8');
      const parsed = JSON.parse(data);
      return {
        name: parsed.name || file.replace('.json', ''),
        description: parsed.description || "No description provided.",
        geometry: parsed.geometry || null,
        aura: parsed.aura || null,
        invocationPath: parsed.metadata?.invocationPath || `/public/${file.replace('.json', '.svg')}`,
        lastUpdated: parsed.metadata?.lastUpdated || null
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        manifest,
        count: manifest.length,
        timestamp: new Date().toISOString()
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate glyph manifest." })
    };
  }
};
