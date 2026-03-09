import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PaletteGenerator = dynamic(() =>
  import("./components/PaletteGenerator").then(
    (mod) => mod.PaletteGenerator
  )
);

export const tool: RegistryTool = {
  slug: "palette-generator",
  name: "Palette Generator",
  description: "Upload an image and extract a color palette. Copy hex codes.",
  category: "image",
  keywords: ["palette generator","extract colors","color palette"],
  component: PaletteGenerator,
  relatedTools: ["color-picker","color-converter","image-compressor"],
  icon: "palette",
  seo: {
  "title": "Palette Generator – Extract Colors from Image | ZeroLoginTools",
  "description": "Upload an image and extract a color palette. Get HEX codes. All in your browser.",
  "keywords": [
    "palette generator",
    "extract colors from image",
    "color palette"
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
