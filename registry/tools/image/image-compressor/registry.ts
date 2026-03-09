import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageCompressor = dynamic(() =>
  import("./components/ImageCompressor").then(
    (mod) => mod.ImageCompressor
  )
);

export const tool: RegistryTool = {
  slug: "image-compressor",
  name: "Image Compressor",
  description: "Compress images directly in your browser.",
  category: "image",
  keywords: ["compress image","image optimizer"],
  component: ImageCompressor,
  relatedTools: ["base64-encoder"],
  icon: "image",
  seo: {
  "title": "Free Image Compressor | ZeroLoginTools",
  "description": "Optimize and compress your images directly in your browser without quality loss.",
  "keywords": [
    "image compression",
    "reduce image size"
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
