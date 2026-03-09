import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const RandomTextGenerator = dynamic(() =>
  import("./components/RandomTextGenerator").then(
    (mod) => mod.RandomTextGenerator
  )
);

export const tool: RegistryTool = {
  slug: "random-text-generator",
  name: "Random Text Generator",
  description: "Generate Lorem Ipsum or random words and paragraphs for placeholders.",
  category: "text",
  keywords: ["lorem ipsum","random text","placeholder text"],
  component: RandomTextGenerator,
  relatedTools: ["word-counter","emoji-generator"],
  icon: "quote",
  seo: {
  "title": "Random Text & Lorem Ipsum Generator | ZeroLoginTools",
  "description": "Generate Lorem Ipsum or random words and paragraphs. Set word count or paragraph count. No login.",
  "keywords": [
    "lorem ipsum",
    "random text generator",
    "placeholder text"
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
