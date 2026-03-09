import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const WordCounter = dynamic(() =>
  import("./components/WordCounter").then(
    (mod) => mod.WordCounter
  )
);

export const tool: RegistryTool = {
  slug: "word-counter",
  name: "Word & Character Counter",
  description: "Count words, characters, lines, paragraphs, and sentences in real time.",
  category: "text",
  keywords: ["word counter","character counter","count words"],
  component: WordCounter,
  relatedTools: ["text-case-converter","duplicate-line-remover"],
  icon: "file-text",
  seo: {
  "title": "Word Counter & Character Counter | ZeroLoginTools",
  "description": "Count words, characters, lines, paragraphs, and sentences in your text instantly. No sign-up required.",
  "keywords": [
    "word counter",
    "character counter",
    "count words online"
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
