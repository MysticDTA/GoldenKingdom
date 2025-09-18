import React from "react";

interface GlyphCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function GlyphCard({ title, description, icon }: GlyphCardProps) {
  return (
    <div className="p-4 rounded-xl border shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition">
      {icon && <div className="mb-2 text-3xl">{icon}</div>}
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
    </div>
  );
}
