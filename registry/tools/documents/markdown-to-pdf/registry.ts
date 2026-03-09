import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const MarkdownToPdf = dynamic(() =>
  import("./components/MarkdownToPdf").then(
    (mod) => mod.MarkdownToPdf
  )
);

export const tool: RegistryTool = {
  slug: "markdown-to-pdf",
  name: "Markdown → PDF",
  description: "Render Markdown to a PDF document and download it.",
  category: "documents",
  keywords: ["markdown to pdf","md to pdf","export markdown pdf"],
  component: MarkdownToPdf,
  relatedTools: ["markdown-html","markdown-preview","html-to-pdf"],
  icon: "file-text",
  seo: {
  "title": "Markdown to PDF – Export MD as PDF | ZeroLoginTools",
  "description": "Write Markdown, preview it, and export to PDF — entirely in your browser.",
  "keywords": [
    "markdown to pdf",
    "md to pdf",
    "export markdown"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Markdown to PDF Export",
    "description": "Turn Markdown into a shareable PDF. Preview your Markdown and export with one click."
  },
  "instructions": {
    "steps": [
      "Write or paste Markdown.",
      "Confirm the preview looks right.",
      "Export and download the PDF."
    ]
  },
  "howToUse": {
    "content": "Paste Markdown on the left, review the preview, then export to a PDF for sharing or printing."
  },
  "howItWorks": {
    "content": "Markdown is rendered to HTML in your browser, then exported to PDF using client-side rendering."
  },
  "security": {
    "description": "No uploads. Your Markdown stays on your device during export."
  },
  "faq": {
    "faqs": [
      {
        "question": "Will it include images?",
        "answer": "Local or same-origin images usually work. Remote images can be blocked by CORS during PDF rendering."
      },
      {
        "question": "Does it support GitHub-flavored Markdown?",
        "answer": "It supports common Markdown features. Complex extensions may render differently depending on the renderer."
      }
    ]
  },
  "features": {
    "features": [
      "Live preview",
      "One-click PDF export",
      "Client-side processing"
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
