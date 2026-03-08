import React from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: React.ReactNode | string;
}

export interface FAQProps {
  title?: string;
  faqs: FAQItem[];
}

export function FAQ({ title = "Frequently Asked Questions", faqs }: FAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border rounded-lg [&_summary::-webkit-details-marker]:hidden bg-card"
          >
            <summary className="flex items-center justify-between cursor-pointer p-4 font-medium focus-visible:outline-1 focus-visible:outline-primary rounded-lg">
              {faq.question}
              <ChevronDown className="h-5 w-5 transition-transform group-open:-rotate-180 text-muted-foreground" />
            </summary>
            <div className="px-4 pb-4 pt-2 text-muted-foreground prose prose-sm dark:prose-invert max-w-none border-t">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
