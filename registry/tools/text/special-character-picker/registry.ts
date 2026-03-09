import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const SpecialCharacterPicker = dynamic(() =>
  import("./components/SpecialCharacterPicker").then(
    (mod) => mod.SpecialCharacterPicker
  )
);

export const tool: RegistryTool = {
  slug: "special-character-picker",
  name: "Special Character Picker",
  description: "Copy currency symbols, math symbols, arrows, and special characters to clipboard.",
  category: "text",
  keywords: ["special characters","unicode symbols","copy symbols"],
  component: SpecialCharacterPicker,
  relatedTools: ["emoji-generator","text-case-converter"],
  icon: "symbol",
  seo: {
  "title": "Special Character Picker – Unicode Symbols | ZeroLoginTools",
  "description": "Browse and copy special characters, currency symbols, arrows, and Unicode symbols. One-click copy.",
  "keywords": [
    "special characters",
    "unicode",
    "symbols picker"
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
