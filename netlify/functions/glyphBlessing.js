// netlify/functions/glyphBlessing.js
exports.handler = async (event) => {
  const { state } = event.queryStringParameters;

  const blessings = {
    active: "🌞 Radiant and invoked — this glyph pulses with ceremonial energy.",
    archival: "📜 Preserved in silence — this glyph rests in the memory of the sanctuary.",
    complete: "🕊️ Whole and unified — this glyph embodies total fusion and ascension.",
    default: "🔍 Unknown state — no blessing found in the scrolls."
  };

  const blessing = blessings[state] || blessings.default;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ state, blessing })
  };
};
