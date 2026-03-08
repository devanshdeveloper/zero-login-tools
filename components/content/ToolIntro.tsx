import React from "react";

export interface ToolIntroProps {
  title: string;
  description: string;
  keywords?: string[];
}

export function ToolIntro({ title, description, keywords }: ToolIntroProps) {
  return (
    <section className="mb-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground mb-4">{description}</p>
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
