import React from "react";
import { FAQ, FAQItem } from "./FAQ";
import { ToolSchema } from "./ToolSchema";

export interface ToolFAQProps {
  title?: string;
  faqs: FAQItem[];
}

export function ToolFAQ({ title, faqs }: ToolFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <>
      <FAQ title={title} faqs={faqs} />
      <ToolSchema type="FAQ" data={faqs} />
    </>
  );
}
