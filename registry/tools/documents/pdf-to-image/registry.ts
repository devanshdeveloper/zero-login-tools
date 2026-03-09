import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PdfToImage = dynamic(() =>
  import("./components/PdfToImage").then(
    (mod) => mod.PdfToImage
  )
);

export const tool: RegistryTool = {
  slug: "pdf-to-image",
  name: "PDF → Image",
  description: "Render a PDF page to a PNG image in your browser.",
  category: "documents",
  keywords: ["pdf to png","pdf to image","convert pdf page to image"],
  component: PdfToImage,
  relatedTools: ["image-to-pdf","pdf-split","image-resizer"],
  icon: "image",
  seo: {
  "title": "PDF to PNG – Convert PDF Page to Image | ZeroLoginTools",
  "description": "Convert a PDF page to a PNG image locally. Pick page number and scale, then download.",
  "keywords": [
    "pdf to png",
    "pdf to image",
    "convert pdf page"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "PDF to PNG (Client-Side)",
    "description": "Render a PDF page as a PNG image. Choose the page and resolution scale and download instantly."
  },
  "instructions": {
    "steps": [
      "Upload a PDF.",
      "Choose a page number and scale.",
      "Render the page and download the PNG."
    ]
  },
  "howToUse": {
    "content": "Upload a PDF, choose which page to render, adjust scale for quality, then download the PNG."
  },
  "howItWorks": {
    "content": "A client-side PDF renderer draws the selected page to a canvas, then exports it as a PNG blob for download."
  },
  "security": {
    "description": "No uploads. Rendering happens locally in your browser."
  },
  "faq": {
    "faqs": [
      {
        "question": "Can I export all pages?",
        "answer": "This version exports one page at a time to keep the UI fast and memory usage lower."
      },
      {
        "question": "Is it lossless?",
        "answer": "PNG is lossless, but rendering is rasterized at the chosen scale."
      }
    ]
  },
  "features": {
    "features": [
      "Page selector",
      "Scale control",
      "Download as PNG"
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
