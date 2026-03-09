import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const TextSorter = dynamic(() =>
  import("./components/TextSorter").then(
    (mod) => mod.TextSorter
  )
);

export const tool: RegistryTool = {
  slug: "text-sorter",
  name: "Text Sorter",
  description: "Sort lines alphabetically, by length, or randomize. One item per line.",
  category: "text",
  keywords: ["text sorter","sort lines","alphabetize"],
  component: TextSorter,
  relatedTools: ["duplicate-line-remover","word-counter"],
  icon: "arrow-up-down",
  seo: {
  "title": "Text Sorter – Sort Lines Online | ZeroLoginTools",
  "description": "Sort lines A–Z, Z–A, by length, or randomize. Paste your list and sort instantly.",
  "keywords": [
    "sort lines",
    "text sorter",
    "alphabetize list"
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
