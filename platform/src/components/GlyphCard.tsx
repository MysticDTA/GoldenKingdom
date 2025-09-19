import Image from "next/image";
import Link from "next/link";
import { Glyph } from "@/lib/types";

interface GlyphCardProps {
  glyph: Glyph;
}

export default function GlyphCard({ glyph }: GlyphCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{glyph.name}</h2>

      {glyph.image_url && (
        <div className="mb-2">
          <Image
            src={glyph.image_url}
            alt={glyph.name ?? "Glyph"}
            width={200}
            height={200}
            className="rounded"
          />
        </div>
      )}

      {glyph.meaning && (
        <p className="text-gray-600 mb-2">{glyph.meaning}</p>
      )}

      {glyph.description && (
        <p className="text-gray-700 mb-2">{glyph.description}</p>
      )}

      {glyph.link && (
        <Link href={glyph.link} className="text-blue-600 underline">
          Learn more
        </Link>
      )}
    </div>
  );
}
