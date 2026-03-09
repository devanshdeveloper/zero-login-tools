import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const DuplicateLineRemover = dynamic(() =>
  import("./components/DuplicateLineRemover").then(
    (mod) => mod.DuplicateLineRemover
  )
);

export const tool: RegistryTool = {
  slug: "duplicate-line-remover",
  name: "Duplicate Line Remover",
  description: "Remove duplicate lines from text. Keep first or last occurrence.",
  category: "text",
  keywords: ["remove duplicates","dedupe lines","unique lines"],
  component: DuplicateLineRemover,
  relatedTools: ["text-sorter","word-counter"],
  icon: "list",
  seo: {
  "title": "Duplicate Line Remover – Dedupe Text Online | ZeroLoginTools",
  "description": "Remove duplicate lines from your text. Trim and case options. All processing in your browser.",
  "keywords": [
    "remove duplicate lines",
    "dedupe text",
    "unique lines"
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
