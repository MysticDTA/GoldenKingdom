import './globals.css'
import type { Metadata } from 'next'

// Example font with fallback to your theme variables
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Golden Kingdom',
  description: 'Sovereign Creation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans min-h-screen antialiased transition-colors">
        <header className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold">⚡ Golden Kingdom</h1>
        </header>
        <main className="p-6">{children}</main>
        <footer className="p-4 text-sm text-center border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} Golden Kingdom — Sovereign Creation
        </footer>
      </body>
    </html>
  )
}
