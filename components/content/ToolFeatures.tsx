import React from "react";
import { Check } from "lucide-react";

export interface ToolFeaturesProps {
  title?: string;
  features: string[];
}

export function ToolFeatures({
  title = "Key Features",
  features,
}: ToolFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="my-8 bg-muted/40 border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="grid sm:grid-cols-2 gap-3 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
