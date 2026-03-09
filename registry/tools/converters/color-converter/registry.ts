import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ColorConverter = dynamic(() =>
  import("./components/ColorConverter").then(
    (mod) => mod.ColorConverter
  )
);

export const tool: RegistryTool = {
  slug: "color-converter",
  name: "Color Converter",
  description: "Convert between RGB, HEX, and HSL values.",
  category: "converters",
  keywords: ["color converter","hex to rgb"],
  component: ColorConverter,
  relatedTools: ["unit-converter"],
  icon: "palette",
  seo: {
  "title": "Color Format Converter | ZeroLoginTools",
  "description": "Easily convert color values between HEX, RGB, and HSL spaces.",
  "keywords": [
    "hex rgb",
    "color translation"
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
