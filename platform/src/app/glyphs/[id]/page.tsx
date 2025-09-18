import { notFound } from "next/navigation"

interface GlyphPageProps {
  params: { id: string }
}

export default function GlyphPage({ params }: GlyphPageProps) {
  const { id } = params

  if (!id) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-8">
      <h1 className="text-4xl font-bold mb-4">🔮 Glyph: {id}</h1>
      <p className="text-lg text-center max-w-xl">
        This is the dynamic glyph page for <code>{id}</code>.  
        You can customize this to fetch data from Supabase or render glyph details.
      </p>
    </main>
  )
}
