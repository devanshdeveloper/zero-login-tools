import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageResizer = dynamic(() =>
  import("./components/ImageResizer").then(
    (mod) => mod.ImageResizer
  )
);

export const tool: RegistryTool = {
  slug: "image-resizer",
  name: "Image Resizer",
  description: "Resize images by width, height, or both. Keep aspect ratio or stretch.",
  category: "image",
  keywords: ["image resizer","resize image","scale image"],
  component: ImageResizer,
  relatedTools: ["image-compressor","image-cropper","gif-resizer"],
  icon: "maximize",
  seo: {
  "title": "Image Resizer – Resize Images Online | ZeroLoginTools",
  "description": "Resize images by width or height. Keep aspect ratio. All processing in your browser.",
  "keywords": [
    "image resizer",
    "resize image",
    "scale image online"
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
