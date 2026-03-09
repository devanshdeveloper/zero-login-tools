import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const EmojiGenerator = dynamic(() =>
  import("./components/EmojiGenerator").then(
    (mod) => mod.EmojiGenerator
  )
);

export const tool: RegistryTool = {
  slug: "emoji-generator",
  name: "Emoji Generator",
  description: "Generate random emojis by category. Copy single or multiple emojis.",
  category: "text",
  keywords: ["emoji generator","random emoji","emoji picker"],
  component: EmojiGenerator,
  relatedTools: ["special-character-picker","random-text-generator"],
  icon: "smile",
  seo: {
  "title": "Random Emoji Generator | ZeroLoginTools",
  "description": "Generate random emojis by category. Copy one or many emojis to clipboard. No login required.",
  "keywords": [
    "emoji generator",
    "random emoji",
    "emoji picker"
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
