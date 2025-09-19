"use client";
import { useEffect, useState } from "react";

interface Glyph {
  id: string;
  name: string;
  meaning: string | null;
  created_at: string;
}

export default function GlyphList() {
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGlyphs = async () => {
      try {
        const res = await fetch("/api/glyphs");
        const data = await res.json();
        setGlyphs(data);
      } catch (err) {
        console.error("Error fetching glyphs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGlyphs();
  }, []);

  if (loading) return <p>Loading glyphs...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Glyphs</h2>
      <ul className="space-y-2">
        {glyphs.map((g) => (
          <li key={g.id} className="p-3 border rounded-lg shadow">
            <h3 className="font-semibold">{g.name}</h3>
            <p className="text-gray-600">{g.meaning ?? "No meaning provided"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
