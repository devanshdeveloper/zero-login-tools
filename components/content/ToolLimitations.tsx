import React from "react";
import { AlertCircle } from "lucide-react";

export interface ToolLimitationsProps {
  title?: string;
  limitations: string[];
}

export function ToolLimitations({
  title = "Limitations",
  limitations,
}: ToolLimitationsProps) {
  if (!limitations || limitations.length === 0) return null;

  return (
    <section className="my-8 border border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4 text-orange-800 dark:text-orange-400">
        <AlertCircle className="h-5 w-5" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <ul className="list-disc list-inside space-y-2 text-sm text-orange-800/80 dark:text-orange-400/80">
        {limitations.map((limitation, i) => (
          <li key={i}>{limitation}</li>
        ))}
      </ul>
    </section>
  );
}
