import GlyphCard from './GlyphCard';
import glyphs from '@/assets/glyphs.json';

export default function GlyphIndex() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {glyphs.map((glyph) => (
        <GlyphCard key={glyph.name} glyph={glyph} />
      ))}
    </section>
  );
}
