import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import type { Glyph } from '@/lib';

type Glyph = {
  id: string
  name: string
  description?: string
  imageUrl?: string
}

export default function GlyphCard({ glyph }: { glyph: Glyph }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{glyph.name}</h3>
      {glyph.imageUrl && (
        <img
          src={glyph.imageUrl}
          alt={glyph.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      {glyph.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {glyph.description}
        </p>
      )}
    </div>
  )
}
