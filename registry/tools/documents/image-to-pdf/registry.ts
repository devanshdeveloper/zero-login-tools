import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ImageToPdf = dynamic(() =>
  import("./components/ImageToPdf").then(
    (mod) => mod.ImageToPdf
  )
);

export const tool: RegistryTool = {
  slug: "image-to-pdf",
  name: "Image → PDF",
  description: "Convert one or more images into a single PDF (one image per page).",
  category: "documents",
  keywords: ["image to pdf","jpg to pdf","png to pdf"],
  component: ImageToPdf,
  relatedTools: ["pdf-to-image","image-format-converter","image-compressor"],
  icon: "file-image",
  seo: {
  "title": "Image to PDF – JPG/PNG to PDF | ZeroLoginTools",
  "description": "Convert images to a PDF directly in your browser. Add multiple images, reorder pages, and download.",
  "keywords": [
    "image to pdf",
    "jpg to pdf",
    "png to pdf"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Convert Images to PDF",
    "description": "Turn one or more images into a single PDF. Reorder images and download a ready-to-share document."
  },
  "instructions": {
    "steps": [
      "Upload one or more images.",
      "Reorder images to set page order.",
      "Create the PDF and download it."
    ]
  },
  "howToUse": {
    "content": "Upload images, reorder them, optionally adjust margins, then export to PDF and download."
  },
  "howItWorks": {
    "content": "Each image is embedded into a PDF page client-side. One page is created per image."
  },
  "security": {
    "description": "All conversion happens locally in your browser. Images are not uploaded."
  },
  "faq": {
    "faqs": [
      {
        "question": "Does it support multiple images?",
        "answer": "Yes. Each image becomes its own page in the PDF in the order you set."
      },
      {
        "question": "What image formats are supported?",
        "answer": "Common formats like PNG and JPEG are supported by most browsers."
      }
    ]
  },
  "features": {
    "features": [
      "Multi-image PDF",
      "Reorder pages",
      "Adjust margins"
    ]
  }
},
  flags: {
    supports_batch: false,
    supports_chain: false,
    cli_supported: false,
    benchmark_available: false,
    embeddable: false,
  },
};
