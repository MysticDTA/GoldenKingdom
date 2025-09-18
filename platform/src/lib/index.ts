// src/lib/index.ts
import type { Database } from './database.types'

// Use the Supabase-generated row type for the glyphs table
export type Glyph = Database['public']['Tables']['glyphs']['Row']

// Re-export everything here if needed
export * from './types'
