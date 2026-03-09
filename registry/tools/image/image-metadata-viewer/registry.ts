import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageMetadataViewer = dynamic(() =>
  import("./components/ImageMetadataViewer").then(
    (mod) => mod.ImageMetadataViewer
  )
);

export const tool: RegistryTool = {
  slug: "image-metadata-viewer",
  name: "Image Metadata Viewer",
  description: "View image dimensions, file size, type, and aspect ratio.",
  category: "image",
  keywords: ["image metadata","image info","dimensions"],
  component: ImageMetadataViewer,
  relatedTools: ["image-compressor","image-resizer"],
  icon: "info",
  seo: {
  "title": "Image Metadata Viewer – View Image Info Online | ZeroLoginTools",
  "description": "View image dimensions, file size, MIME type, and aspect ratio. Client-side.",
  "keywords": [
    "image metadata",
    "image dimensions",
    "image info"
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
