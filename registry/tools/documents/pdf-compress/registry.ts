import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PdfCompress = dynamic(() =>
  import("./components/PdfCompress").then(
    (mod) => mod.PdfCompress
  )
);

export const tool: RegistryTool = {
  slug: "pdf-compress",
  name: "PDF Compress",
  description: "Optimize a PDF by re-saving and optionally stripping metadata (client-side).",
  category: "documents",
  keywords: ["compress pdf","optimize pdf","reduce pdf size"],
  component: PdfCompress,
  relatedTools: ["pdf-merge","pdf-split"],
  icon: "file-down",
  seo: {
  "title": "PDF Compressor (Client-Side) | ZeroLoginTools",
  "description": "Optimize PDFs locally by stripping metadata and re-saving with object streams. No uploads, no accounts.",
  "keywords": [
    "pdf compress",
    "optimize pdf",
    "reduce pdf size"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "PDF Optimizer & Lightweight Compressor",
    "description": "Reduce PDF size when possible by re-saving and stripping metadata. Runs entirely in your browser for maximum privacy."
  },
  "instructions": {
    "steps": [
      "Upload a PDF file.",
      "Choose optimization options (metadata stripping, object streams).",
      "Click “Optimize PDF” and download the output."
    ]
  },
  "howToUse": {
    "content": "Upload your PDF, enable the options you want, then optimize and download the result."
  },
  "howItWorks": {
    "content": "The tool rebuilds the PDF structure client-side and saves it with settings that can reduce file size for some PDFs."
  },
  "security": {
    "description": "No uploads. Your PDF stays on your device and is processed locally."
  },
  "limitations": {
    "limitations": [
      "True compression (image downsampling) is limited in fully client-side tools.",
      "Some PDFs may not get smaller depending on how they were produced."
    ]
  },
  "faq": {
    "faqs": [
      {
        "question": "Will it always reduce file size?",
        "answer": "Not always. Some PDFs are already optimized, or contain content that can’t be reduced without downsampling images."
      },
      {
        "question": "Does it remove text or pages?",
        "answer": "No. Optimization preserves the document pages and content."
      }
    ]
  },
  "features": {
    "features": [
      "Strip metadata",
      "Object stream saving",
      "Private client-side processing"
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
