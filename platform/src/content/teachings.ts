// Defines the structure for a single teaching or scroll.
export type Teaching = {
  id: number;
  title: string;
  summary: string;
  paragraphs: string[];
};

// An array to hold all of your teachings.
export const dtaTeachings: Teaching[] = [
  {
    id: 1,
    title: "The Principle of Oneness",
    summary: "Understanding the interconnected nature of all things.",
    paragraphs: [
      "The first and most fundamental truth is that of unity. Nothing exists in isolation; every particle, every being, every thought is woven into the magnificent tapestry of existence.",
      "To harm another is to harm oneself. To heal another is to heal oneself. This is not a metaphor, but the literal mechanics of a universe bound by a shared consciousness."
    ]
  },
  // ... Add more teachings from your DTA repo here
];

