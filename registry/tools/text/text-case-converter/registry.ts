import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const TextCaseConverter = dynamic(() =>
  import("./components/TextCaseConverter").then(
    (mod) => mod.TextCaseConverter
  )
);

export const tool: RegistryTool = {
  slug: "text-case-converter",
  name: "Text Case Converter",
  description: "Convert text between uppercase, lowercase, title case, camelCase, snake_case, and more.",
  category: "text",
  keywords: ["text case converter","uppercase","lowercase","title case","camelCase"],
  component: TextCaseConverter,
  relatedTools: ["word-counter","text-sorter"],
  icon: "type",
  seo: {
  "title": "Text Case Converter – Uppercase, Lowercase, Title Case | ZeroLoginTools",
  "description": "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case instantly.",
  "keywords": [
    "text case converter",
    "change case",
    "capitalize"
  ]
},
  contentBlocks: undefined,
  flags: {
    supports_batch: false,
    supports_chain: false,
    cli_supported: false,
    benchmark_available: false,
    embeddable: false,
  },
};
