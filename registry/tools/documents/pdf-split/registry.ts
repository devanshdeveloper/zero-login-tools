import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PdfSplit = dynamic(() =>
  import("./components/PdfSplit").then(
    (mod) => mod.PdfSplit
  )
);

export const tool: RegistryTool = {
  slug: "pdf-split",
  name: "PDF Split",
  description: "Extract a page range or split a PDF into single-page files.",
  category: "documents",
  keywords: ["split pdf","extract pdf pages","pdf splitter"],
  component: PdfSplit,
  relatedTools: ["pdf-merge","pdf-compress","pdf-to-image"],
  icon: "scissors",
  seo: {
  "title": "PDF Split – Extract Pages Online | ZeroLoginTools",
  "description": "Split a PDF into single pages or extract a page range. Runs 100% in your browser. No login required.",
  "keywords": [
    "pdf split",
    "extract pdf pages",
    "pdf splitter online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Split PDF (Client-Side)",
    "description": "Extract exactly the pages you need or split a PDF into single-page PDFs. All processing happens locally in your browser.",
    "keywords": [
      "PDF split",
      "Extract pages",
      "Client-side PDF"
    ]
  },
  "instructions": {
    "steps": [
      "Upload a PDF file.",
      "Choose “Extract page range” or “Split into single pages”.",
      "Run the action and download the result."
    ]
  },
  "howToUse": {
    "content": "Use “Extract page range” to create one new PDF that contains only the pages you select. Use “Split into single pages” to generate one PDF per page. Downloads are created locally in your browser; nothing is uploaded."
  },
  "howItWorks": {
    "content": "This tool reads your PDF in-memory and copies selected pages into new PDFs using a client-side PDF library. The generated PDFs are offered as downloads via a temporary browser blob URL."
  },
  "security": {
    "title": "Privacy & Security",
    "description": "Your PDF never leaves your device. Page extraction happens entirely in your browser."
  },
  "faq": {
    "faqs": [
      {
        "question": "Does splitting upload my PDF?",
        "answer": "No. Splitting and extraction are performed locally in your browser."
      },
      {
        "question": "Can I extract non-contiguous pages?",
        "answer": "This version supports page ranges and splitting into single pages. For custom page lists, split into single pages and download the pages you need."
      }
    ]
  },
  "features": {
    "features": [
      "Extract page ranges",
      "Split into single-page PDFs",
      "No sign-up, no server upload"
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
