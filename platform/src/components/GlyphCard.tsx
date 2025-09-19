import Image from "next/image";

export type Glyph = {
  id: string;
  name: string;
  meaning: string | null;
  created_at: string | null;
  image_url?: string | null;   // ✅ added
  description?: string | null; // ✅ added
};

type GlyphCardProps = {
  glyph: Glyph;
};

export default function GlyphCard({ glyph }: GlyphCardProps) {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{glyph.name}</h2>

      {glyph.image_url && (
        <div className="mb-2">
          <Image
            src={glyph.image_url}
            alt={glyph.name}
            width={200}
            height={200}
            className="rounded"
          />
        </div>
      )}

      {glyph.meaning && <p className="text-gray-600">{glyph.meaning}</p>}

      {glyph.description && (
        <p className="mt-2 text-sm text-gray-500">{glyph.description}</p>
      )}
    </div>
  );
}
