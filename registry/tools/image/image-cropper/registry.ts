import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageCropper = dynamic(() =>
  import("./components/ImageCropper").then(
    (mod) => mod.ImageCropper
  )
);

export const tool: RegistryTool = {
  slug: "image-cropper",
  name: "Image Cropper",
  description: "Crop images by specifying x, y, width, and height. Download cropped image.",
  category: "image",
  keywords: ["image cropper","crop image","crop photo"],
  component: ImageCropper,
  relatedTools: ["image-resizer","image-compressor"],
  icon: "crop",
  seo: {
  "title": "Image Cropper – Crop Images Online | ZeroLoginTools",
  "description": "Crop images with custom dimensions. Enter x, y, width, height. Client-side only.",
  "keywords": [
    "image cropper",
    "crop image",
    "crop photo online"
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
