import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const FaviconGenerator = dynamic(() =>
  import("./components/FaviconGenerator").then(
    (mod) => mod.FaviconGenerator
  )
);

export const tool: RegistryTool = {
  slug: "favicon-generator",
  name: "Favicon Generator",
  description: "Generate 16×16, 32×32, and 48×48 favicons from an image.",
  category: "image",
  keywords: ["favicon generator","favicon","favicon.ico"],
  component: FaviconGenerator,
  relatedTools: ["image-resizer","image-compressor"],
  icon: "image",
  seo: {
  "title": "Favicon Generator – Create Favicons Online | ZeroLoginTools",
  "description": "Generate 16×16, 32×32, and 48×48 PNG favicons from any image. No upload.",
  "keywords": [
    "favicon generator",
    "create favicon",
    "favicon.ico"
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
