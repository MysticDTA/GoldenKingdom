// Import the teachings from our new content archive
import { dtaTeachings } from "@/content/teachings";

export default function LibraryPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-bold font-serif mb-8 text-center border-b pb-4">
        The Library of Scrolls
      </h1>

      {/* We loop through each teaching and display it */}
      {dtaTeachings.map((teaching) => (
        <article key={teaching.id} className="mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-2">{teaching.title}</h2>
          <p className="text-lg italic text-gray-600 mb-4">{teaching.summary}</p>

          {/* This 'prose' class from Tailwind CSS automatically styles text for readability */}
          <div className="prose prose-lg max-w-none">
            {teaching.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

