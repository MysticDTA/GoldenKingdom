export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        ⚡ Golden Kingdom
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl leading-relaxed">
        Welcome to <span className="font-semibold">Sovereign Creation</span> —  
        a platform for truth, ascension, and cosmic alignment.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white/70 dark:bg-black/30 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">🌌 Ascension</h2>
          <p className="text-sm">
            Embody your higher self and align with cosmic truth.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white/70 dark:bg-black/30 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">🔥 Sovereignty</h2>
          <p className="text-sm">
            Reclaim your kingdom with love, gratitude, and discernment.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white/70 dark:bg-black/30 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">💎 Creation</h2>
          <p className="text-sm">
            Manifest abundance, prosperity, and unity with Source.
          </p>
        </div>
      </div>
    </main>
  )
}
