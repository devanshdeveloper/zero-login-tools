import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const HtmlToPdf = dynamic(() =>
  import("./components/HtmlToPdf").then(
    (mod) => mod.HtmlToPdf
  )
);

export const tool: RegistryTool = {
  slug: "html-to-pdf",
  name: "HTML → PDF",
  description: "Convert HTML into a downloadable PDF document (client-side).",
  category: "documents",
  keywords: ["html to pdf","export html pdf","convert html to pdf"],
  component: HtmlToPdf,
  relatedTools: ["markdown-to-pdf","html-minifier"],
  icon: "file-code",
  seo: {
  "title": "HTML to PDF – Convert HTML Online | ZeroLoginTools",
  "description": "Paste HTML and export it as a PDF. Runs locally in your browser with no server processing.",
  "keywords": [
    "html to pdf",
    "export html",
    "convert html to pdf online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "HTML to PDF Converter",
    "description": "Convert HTML content to a PDF quickly for sharing or printing. Everything runs locally in your browser."
  },
  "instructions": {
    "steps": [
      "Paste HTML",
      "Preview rendering",
      "Export to PDF and download"
    ]
  },
  "howToUse": {
    "content": "Paste your HTML, verify the rendered preview, then export and download the PDF."
  },
  "howItWorks": {
    "content": "The HTML is rendered in a local container and then exported to a PDF using client-side rendering."
  },
  "security": {
    "description": "No uploads. Your HTML stays in your browser."
  },
  "faq": {
    "faqs": [
      {
        "question": "Will scripts run in the preview?",
        "answer": "Scripts are not executed for export safety. This tool focuses on static HTML + CSS rendering."
      },
      {
        "question": "Why do some images not appear?",
        "answer": "Remote images can be blocked by CORS. Prefer embedded data URLs or same-origin assets."
      }
    ]
  },
  "features": {
    "features": [
      "Paste HTML",
      "Preview",
      "Export PDF"
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
