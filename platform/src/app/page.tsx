import Image from 'next/image';

// Defines the "shape" of our Glyph data using TypeScript.
type Glyph = {
  name: string;
  image: string;
  intention: string;
  symbolism: string;
};

// The data for our glyph.
const glyphData: Glyph = {
  name: "The Glyph of Stillness",
  image: "/glyph.png", // This image must be in the 'public' folder.
  intention: "To quiet the mind and find peace in the present moment.",
  symbolism: "This glyph represents the tranquil surface of a deep lake, untouched by wind. It is a focal point for meditation, helping to dissolve anxious thoughts and return the bearer to a state of serene awareness."
};

// The main page component.
export default function HomePage() {
  return (
    // Main container centers content on a light gray background.
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-12 font-serif text-gray-800">

      {/* Content wrapper sets a max width and centers text. */}
      <div className="max-w-xl text-center">

        {/* The Glyph Image */}
        <Image 
          src={glyphData.image}
          alt={glyphData.name}
          width={200}
          height={200}
          className="mx-auto rounded-full border-4 border-gray-200 p-2 shadow-lg"
        />

        {/* The Glyph's Name */}
        <h1 className="mt-6 text-5xl font-bold">
          {glyphData.name}
        </h1>

        {/* The Glyph's Intention */}
        <p className="mt-2 text-xl italic text-gray-600">
          {glyphData.intention}
        </p>

        {/* The Glyph's Symbolism */}
        <p className="mt-8 text-left text-lg leading-relaxed">
          {glyphData.symbolism}
        </p>

      </div>
    </main>
  );
}
