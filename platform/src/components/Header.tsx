import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Main Logo/Link to Home */}
        <Link href="/" className="text-2xl font-bold font-serif text-gray-800 hover:text-blue-600">
          Golden Kingdom
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-lg font-medium text-gray-600 hover:text-blue-600">
            Gallery
          </Link>
          <Link href="/library" className="text-lg font-medium text-gray-600 hover:text-blue-600">
            Library
          </Link>
        </div>
      </nav>
    </header>
  );
}
