const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const publicPath = path.resolve(__dirname, '../../public');

  try {
    const files = fs.readdirSync(publicPath);
    const glyphFiles = files.filter(file => file.endsWith('.json'));

    const manifest = glyphFiles.map(file => {
      const baseName = file.replace('.json', '');
      const jsonPath = path.join(publicPath, file);
      const svgPath = path.join(publicPath, `${baseName}.svg`);

      const lineage = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const svg = fs.existsSync(svgPath)
        ? fs.readFileSync(svgPath, 'utf8')
        : null;

      return {
        name: lineage.name || baseName,
        description: lineage.description || "No description provided.",
        geometry: lineage.geometry || null,
        aura: lineage.aura || null,
        invocationPath: `/public/${baseName}.svg`,
        lastUpdated: lineage.metadata?.lastUpdated || null,
        svgPreview: svg
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
