import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ColorPicker = dynamic(() =>
  import("./components/ColorPicker").then(
    (mod) => mod.ColorPicker
  )
);

export const tool: RegistryTool = {
  slug: "color-picker",
  name: "Color Picker",
  description: "Pick a color and get HEX and RGB values. Copy to clipboard.",
  category: "converters",
  keywords: ["color picker","hex color","rgb color"],
  component: ColorPicker,
  relatedTools: ["color-converter","palette-generator"],
  icon: "pipette",
  seo: {
  "title": "Color Picker – HEX & RGB | ZeroLoginTools",
  "description": "Pick a color and get HEX and RGB values. Copy with one click. No sign-up.",
  "keywords": [
    "color picker",
    "hex color",
    "rgb color picker"
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
