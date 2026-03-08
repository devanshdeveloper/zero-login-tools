import React from "react";

export interface Example {
  label?: string;
  input: string;
  output: string;
}

export interface ToolExamplesProps {
  title?: string;
  examples: Example[];
}

export function ToolExamples({
  title = "Examples",
  examples,
}: ToolExamplesProps) {
  if (!examples || examples.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-6">
        {examples.map((ex, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            {ex.label && (
              <div className="bg-muted px-4 py-2 font-medium border-b">
                {ex.label}
              </div>
            )}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              <div className="p-4 overflow-hidden">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                  Input
                </h3>
                <pre className="bg-muted/50 p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                  <code>{ex.input}</code>
                </pre>
              </div>
              <div className="p-4 overflow-hidden">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                  Output
                </h3>
                <pre className="bg-muted/50 p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                  <code>{ex.output}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
