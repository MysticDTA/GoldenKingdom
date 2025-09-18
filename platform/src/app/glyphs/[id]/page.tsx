// src/app/glyphs/[id]/page.tsx
import type { Glyph } from '@/lib'

export default function GlyphPage({ params }: { params: { id: string } }) {
  const glyph: Glyph = {
    id: params.id,
    name: 'Solar Flame',
    description: 'Example glyph detail',
    image_url: null,
    created_at: new Date().toISOString(),
  }

  return (
    <main>
      <h1>{glyph.name}</h1>
      <p>{glyph.description}</p>
    </main>
  )
}
