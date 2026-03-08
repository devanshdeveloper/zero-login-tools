import React from "react";

export interface ToolInstructionsProps {
  title?: string;
  steps: string[];
}

export function ToolInstructions({
  title = "How to use this tool",
  steps,
}: ToolInstructionsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="my-8 border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
        {steps.map((step, index) => (
          <li
            key={index}
            className="pl-2 marker:font-semibold marker:text-foreground"
          >
            <span className="text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
