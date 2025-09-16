document.addEventListener("DOMContentLoaded", () => {
  fetch("glyphRegistry.json")
    .then(res => res.json())
    .then(glyphs => {
      const container = document.getElementById("glyph-manifest");
      glyphs.forEach(glyph => {
        const wrapper = document.createElement("div");
        wrapper.className = "glyph-wrapper";

        const img = document.createElement("img");
        img.src = glyph.path;
        img.alt = glyph.name;
        img.title = `${glyph.name} — ${glyph.intention}`;
        img.className = "glyph-preview";

        const label = document.createElement("p");
        label.textContent = `${glyph.name} (${glyph.lineage})`;
        label.className = "glyph-label";

        wrapper.appendChild(img);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
      });
    })
    .catch(err => {
      console.error("🛑 Failed to load glyph registry:", err);
    });
});
