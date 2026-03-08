import React from "react";

export interface ChangelogItem {
  version: string;
  date?: string;
  description: string;
}

export interface ToolChangelogProps {
  title?: string;
  items: ChangelogItem[];
}

export function ToolChangelog({
  title = "Changelog",
  items,
}: ToolChangelogProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="my-8 border rounded-lg p-6 bg-muted/20">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <ul className="space-y-3 text-sm">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row sm:gap-4 border-b last:border-0 pb-3 last:pb-0 border-border/50"
          >
            <div className="flex gap-2 items-baseline w-32 shrink-0">
              <span className="font-semibold text-foreground">
                {item.version}
              </span>
              {item.date && (
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
