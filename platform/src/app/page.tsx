// src/app/page.tsx
import type { Glyph } from '@/lib'
import GlyphCard from '@/components/GlyphCard'

export default function Page() {
  // Demo glyphs — replace with Supabase fetch later
  const glyphs: Glyph[] = [
    {
      id: '1',
      name: 'Solar Flame',
      description: 'Example glyph',
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Celestial Wave',
      description: 'Another glyph',
      image_url: null,
      created_at: new Date().toISOString(),
    },
  ]

  return (
    <main>
      <h1>Glyphs</h1>
      <div className="glyph-list">
        {glyphs.map((glyph) => (
          <GlyphCard key={glyph.id} glyph={glyph} />
        ))}
      </div>
    </main>
  )
}
