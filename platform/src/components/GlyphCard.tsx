import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import type { Glyph } from '@/lib';

type Glyph = {
  id: string
  name: string
  description?: string
  imageUrl?: string
}

// src/components/GlyphCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Glyph } from '@/lib'

export default function GlyphCard({ glyph }: { glyph: Glyph }) {
  return (
    <div className="glyph-card">
      <h2>{glyph.name}</h2>

      {glyph.image_url && (
        <Image
          src={glyph.image_url}
          alt={glyph.name}
          width={200}
          height={200}
        />
      )}

      <p>{glyph.description}</p>
      <Link href={`/glyphs/${glyph.id}`}>View details</Link>
    </div>
  )
}
