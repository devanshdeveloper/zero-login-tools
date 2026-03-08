import React from "react";
import Link from "next/link";

export interface ToolLink {
  name: string;
  href: string;
  description?: string;
}

export interface RelatedToolsProps {
  title?: string;
  tools: ToolLink[];
}

export function RelatedTools({
  title = "Related Tools",
  tools,
}: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <Link
            key={i}
            href={tool.href}
            className="block p-4 border rounded-lg hover:border-primary transition-colors bg-card hover:shadow-sm"
          >
            <h3 className="font-semibold text-foreground">{tool.name}</h3>
            {tool.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {tool.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
