import GlyphCard from "@/components/GlyphCard";
import { Glyph } from "@/lib/types";
import glyphsData from "@/assets/glyphs.json";

export default function GlyphIndex() {
  // ✅ Cast JSON data to Glyph[]
  const glyphs: Glyph[] = glyphsData as Glyph[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {glyphs.map((glyph) => (
        <GlyphCard key={glyph.id} glyph={glyph} />
      ))}
    </div>
  );
}
