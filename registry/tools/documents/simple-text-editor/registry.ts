import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const SimpleTextEditor = dynamic(() =>
  import("./components/SimpleTextEditor").then(
    (mod) => mod.SimpleTextEditor
  )
);

export const tool: RegistryTool = {
  slug: "simple-text-editor",
  name: "Simple Text Editor",
  description: "A lightweight in-browser text editor with copy and download.",
  category: "documents",
  keywords: ["text editor","notepad","online text editor"],
  component: SimpleTextEditor,
  relatedTools: ["word-counter","collaborative-notepad"],
  icon: "file-text",
  seo: {
  "title": "Simple Text Editor – Browser Notepad | ZeroLoginTools",
  "description": "Write, edit, copy, and download text instantly. No login. No storage. Fully client-side.",
  "keywords": [
    "text editor",
    "online notepad",
    "write text online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Simple Text Editor (No Login)",
    "description": "A clean, fast text editor that runs in your browser. Copy to clipboard or download as a .txt file."
  },
  "instructions": {
    "steps": [
      "Type or paste text into the editor.",
      "Use Copy to copy to clipboard.",
      "Use Download to save as a .txt file."
    ]
  },
  "howToUse": {
    "content": "Type your text, then copy it or download it as a text file. Your content stays in-memory unless you download it."
  },
  "howItWorks": {
    "content": "This is a client-side editor powered by your browser. No data is stored on a server."
  },
  "security": {
    "description": "No automatic saving and no uploads. Your text stays on your device."
  },
  "faq": {
    "faqs": [
      {
        "question": "Is my text saved anywhere?",
        "answer": "No. This editor does not persist data. If you refresh the page, your text may be lost unless you download it."
      },
      {
        "question": "Can I use this offline?",
        "answer": "Often yes after the page is loaded once, depending on browser caching."
      }
    ]
  },
  "features": {
    "features": [
      "Word/character stats",
      "Copy",
      "Download .txt"
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
