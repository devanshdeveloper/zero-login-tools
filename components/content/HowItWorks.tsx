import React, { ReactNode } from "react";

export interface HowItWorksProps {
  title?: string;
  children: ReactNode;
}

export function HowItWorks({
  title = "How It Works",
  children,
}: HowItWorksProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-4 text-muted-foreground prose prose-gray dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}
