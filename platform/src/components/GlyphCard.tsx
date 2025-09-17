import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import type { Glyph } from '@/lib';

export default function GlyphCard({ glyph }: { glyph: Glyph }) {
  return (
    // This Link component makes the whole card clickable
    <Link href={`/glyphs/${glyph.id}`} className="w-full max-w-xl mb-12 transform hover:scale-105 transition-transform duration-300">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <Image 
          src={glyph.image}
          alt={glyph.name}
          width={150}
          height={150}
          className="mx-auto rounded-full border-4 border-gray-100 p-1 shadow-md"
        />
        <h1 className="mt-6 text-4xl font-bold font-serif text-gray-800">
          {glyph.name}
        </h1>
        <p className="mt-2 text-lg italic text-gray-600">
          {glyph.intention}
        </p>
        <p className="mt-6 text-left text-base leading-relaxed text-gray-700">
          {glyph.symbolism}
        </p>
      </div>
    </Link>
  );
}
