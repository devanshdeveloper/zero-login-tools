import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const BackgroundRemover = dynamic(() =>
  import("./components/BackgroundRemover").then(
    (mod) => mod.BackgroundRemover
  )
);

export const tool: RegistryTool = {
  slug: "background-remover",
  name: "Background Remover",
  description: "Remove a solid-color background (e.g. green screen) by color and tolerance.",
  category: "image",
  keywords: ["background remover","remove background","green screen"],
  component: BackgroundRemover,
  relatedTools: ["image-compressor","image-format-converter"],
  icon: "eraser",
  seo: {
  "title": "Background Remover – Remove Solid Color Background | ZeroLoginTools",
  "description": "Remove a solid-color background from images. Pick color and tolerance. Output PNG with transparency.",
  "keywords": [
    "background remover",
    "remove background",
    "green screen removal"
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
