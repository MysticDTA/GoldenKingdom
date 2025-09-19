// src/lib/types.ts

export type Glyph = {
  id: string;
  name: string;
  meaning: string | null;
  description?: string | null;
  image_url?: string | null;
  created_at: string | null;
};
