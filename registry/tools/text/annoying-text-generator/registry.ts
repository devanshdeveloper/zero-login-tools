import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const AnnoyingTextGenerator = dynamic(() =>
  import("./components/AnnoyingTextGenerator").then(
    (mod) => mod.AnnoyingTextGenerator
  )
);

export const tool: RegistryTool = {
  slug: "annoying-text-generator",
  name: "Annoying Text Generator",
  description: "Transform text into zalgo, alternating caps, upside down, spongebob, and more.",
  category: "text",
  keywords: ["zalgo text","upside down text","annoying text"],
  component: AnnoyingTextGenerator,
  relatedTools: ["text-case-converter","emoji-generator"],
  icon: "sparkles",
  seo: {
  "title": "Annoying Text Generator – Zalgo, Upside Down | ZeroLoginTools",
  "description": "Create zalgo text, alternating caps, upside down text, spongebob case, and other fun text styles.",
  "keywords": [
    "zalgo text",
    "upside down text",
    "annoying text generator"
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
