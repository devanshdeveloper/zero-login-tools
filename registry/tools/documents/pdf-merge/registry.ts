import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PdfMerge = dynamic(() =>
  import("./components/PdfMerge").then(
    (mod) => mod.PdfMerge
  )
);

export const tool: RegistryTool = {
  slug: "pdf-merge",
  name: "PDF Merge",
  description: "Combine multiple PDFs into a single merged PDF in your chosen order.",
  category: "documents",
  keywords: ["merge pdf","combine pdf","pdf joiner"],
  component: PdfMerge,
  relatedTools: ["pdf-split","pdf-compress"],
  icon: "files",
  seo: {
  "title": "PDF Merge – Combine PDFs Online | ZeroLoginTools",
  "description": "Merge multiple PDF files into one. Reorder inputs and download the combined PDF. Fully client-side.",
  "keywords": [
    "merge pdf",
    "combine pdf",
    "pdf joiner online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Merge PDFs",
    "description": "Combine multiple PDFs into a single file. Reorder inputs, merge instantly, and download the result — all in your browser."
  },
  "instructions": {
    "steps": [
      "Upload two or more PDF files.",
      "Reorder the PDFs using the up/down arrows.",
      "Click “Merge PDFs” and download the merged file."
    ]
  },
  "howToUse": {
    "content": "Upload your PDFs, arrange them in the correct order, then merge and download the combined PDF."
  },
  "howItWorks": {
    "content": "The tool copies pages from each input PDF into a new PDF document entirely client-side, then generates a download."
  },
  "security": {
    "description": "No file uploads. Your PDFs are processed locally in your browser memory."
  },
  "faq": {
    "faqs": [
      {
        "question": "Can I reorder PDFs before merging?",
        "answer": "Yes — use the up/down buttons to change the merge order."
      },
      {
        "question": "Is there a file size limit?",
        "answer": "Limits depend on your device and browser memory. Very large PDFs may be slow."
      }
    ]
  },
  "features": {
    "features": [
      "Multi-file merge",
      "Reorder inputs",
      "Instant download"
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
