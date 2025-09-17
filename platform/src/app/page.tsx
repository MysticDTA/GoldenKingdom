// Import our data and our NEW GlyphCard component
import { sacredGlyphs } from '@/lib';
import GlyphCard from '@/components/GlyphCard';

// Look how simple and clean the homepage is now!
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-6 sm:p-12">
      {sacredGlyphs.map(glyph => (
        <GlyphCard key={glyph.id} glyph={glyph} />
      ))}
    </main>
  );
}
