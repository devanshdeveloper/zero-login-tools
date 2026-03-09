import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const WordCloudGenerator = dynamic(() =>
  import("./components/WordCloudGenerator").then(
    (mod) => mod.WordCloudGenerator
  )
);

export const tool: RegistryTool = {
  slug: "word-cloud-generator",
  name: "Word Cloud Generator",
  description: "Generate a word cloud from your text. Word frequency visualized by size.",
  category: "text",
  keywords: ["word cloud","word cloud generator","tag cloud"],
  component: WordCloudGenerator,
  relatedTools: ["word-counter","text-sorter"],
  icon: "cloud",
  seo: {
  "title": "Word Cloud Generator – Create Word Clouds Online | ZeroLoginTools",
  "description": "Create a word cloud from your text. Words sized by frequency. Client-side, private.",
  "keywords": [
    "word cloud",
    "word cloud generator",
    "tag cloud"
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
