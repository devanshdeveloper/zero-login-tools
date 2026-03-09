import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageRotator = dynamic(() =>
  import("./components/ImageRotator").then(
    (mod) => mod.ImageRotator
  )
);

export const tool: RegistryTool = {
  slug: "image-rotator",
  name: "Image Rotator",
  description: "Rotate images by 90°, 180°, or 270°. Download rotated image.",
  category: "image",
  keywords: ["image rotator","rotate image","rotate photo"],
  component: ImageRotator,
  relatedTools: ["image-resizer","image-cropper"],
  icon: "rotate-cw",
  seo: {
  "title": "Image Rotator – Rotate Images Online | ZeroLoginTools",
  "description": "Rotate images 90, 180, or 270 degrees. Download result. No upload to server.",
  "keywords": [
    "rotate image",
    "image rotator",
    "rotate photo online"
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
