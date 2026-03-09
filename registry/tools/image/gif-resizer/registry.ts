import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const GifResizer = dynamic(() =>
  import("./components/GifResizer").then(
    (mod) => mod.GifResizer
  )
);

export const tool: RegistryTool = {
  slug: "gif-resizer",
  name: "GIF Resizer",
  description: "Resize GIF or any image by width. Aspect ratio preserved. Animated GIF: first frame only.",
  category: "image",
  keywords: ["gif resizer","resize gif","gif size"],
  component: GifResizer,
  relatedTools: ["image-resizer","image-compressor"],
  icon: "image",
  seo: {
  "title": "GIF Resizer – Resize GIF Online | ZeroLoginTools",
  "description": "Resize GIF or images by width. Keeps aspect ratio. Client-side. Animated GIF: first frame.",
  "keywords": [
    "gif resizer",
    "resize gif",
    "gif resize online"
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
