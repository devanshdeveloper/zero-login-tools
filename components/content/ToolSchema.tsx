import React from "react";

export type SchemaType = "FAQ" | "HowTo" | "SoftwareApplication";

export interface ToolSchemaProps {
  type: SchemaType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function ToolSchema({ type, data }: ToolSchemaProps) {
  let schemaContent = {};

  if (type === "FAQ") {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mainEntity: data.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            typeof faq.answer === "string" ? faq.answer : String(faq.answer),
        },
      })),
    };
  } else if (type === "HowTo") {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: data.name,
      description: data.description,
      step: data.steps.map((step: string, index: number) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step,
      })),
    };
  } else if (type === "SoftwareApplication") {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: data.name,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      description: data.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContent) }}
    />
  );
}
