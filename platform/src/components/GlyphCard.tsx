import Image from 'next/image';
import Link from 'next/link';
import type { Glyph } from '@/lib';

export default function GlyphCard({ glyph }: { glyph: Glyph }) {
  return (
    <div className="glyph-card border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">{glyph.name}</h2>

      {glyph.image_url && (
        <Image
          src={glyph.image_url}
          alt={glyph.name}
          width={200}
          height={200}
          className="mb-2"
        />
      )}

      {glyph.description && (
        <p className="text-gray-700 mb-2">{glyph.description}</p>
      )}

      {glyph.link && (
        <Link href={glyph.link} className="text-blue-600 underline">
          Explore glyph
        </Link>
      )}
    </div>
  );
}
