import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageFormatConverter = dynamic(() =>
  import("./components/ImageFormatConverter").then(
    (mod) => mod.ImageFormatConverter
  )
);

export const tool: RegistryTool = {
  slug: "image-format-converter",
  name: "Image Format Converter",
  description: "Convert images between PNG, JPEG, and WebP.",
  category: "image",
  keywords: ["image format converter","png to jpg","jpg to png"],
  component: ImageFormatConverter,
  relatedTools: ["image-compressor","favicon-generator"],
  icon: "image",
  seo: {
  "title": "Image Format Converter – PNG, JPEG, WebP | ZeroLoginTools",
  "description": "Convert images between PNG, JPEG, and WebP. All processing in your browser.",
  "keywords": [
    "image format converter",
    "png to jpg",
    "convert image format"
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
