import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface Benefit {
  title: string;
  description: string;
}

export interface ToolBenefitsProps {
  title?: string;
  benefits: Benefit[];
}

export function ToolBenefits({
  title = "Benefits of this tool",
  benefits,
}: ToolBenefitsProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg bg-card">
            <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
