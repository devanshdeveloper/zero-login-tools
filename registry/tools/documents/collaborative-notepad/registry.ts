import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const CollaborativeNotepad = dynamic(() =>
  import("./components/CollaborativeNotepad").then(
    (mod) => mod.CollaborativeNotepad
  )
);

export const tool: RegistryTool = {
  slug: "collaborative-notepad",
  name: "Collaborative Notepad (Local Session)",
  description: "Create a shareable note link (URL fragment) for lightweight collaboration. No backend.",
  category: "documents",
  keywords: ["collaborative notepad","share note","no login notepad"],
  component: CollaborativeNotepad,
  relatedTools: ["simple-text-editor","markdown-preview"],
  icon: "users",
  seo: {
  "title": "Collaborative Notepad (No Backend) | ZeroLoginTools",
  "description": "Create a share link that contains your note in the URL fragment. Share it to collaborate — no accounts or servers.",
  "keywords": [
    "collaborative notepad",
    "share note",
    "no backend notepad"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Collaborative Notepad (Share via Link)",
    "description": "A lightweight collaboration approach: generate a share link that includes your note content in the URL fragment. No server storage."
  },
  "instructions": {
    "steps": [
      "Write your note.",
      "Click “Generate share link”.",
      "Copy and send the link to someone else.",
      "They open it and see the same note content."
    ]
  },
  "howToUse": {
    "content": "Type your note, generate a share link, and send it. The note content is embedded in the link fragment."
  },
  "howItWorks": {
    "content": "The tool Base64-encodes your note into the URL fragment (after #). The fragment is never sent to the server during HTTP requests."
  },
  "security": {
    "description": "No uploads or server storage. Be careful: anyone with the link can read the note."
  },
  "faq": {
    "faqs": [
      {
        "question": "Is this real-time collaboration?",
        "answer": "Not real-time. It’s link-based sharing. To sync changes, generate a new link and resend it."
      },
      {
        "question": "Is the note visible to the server?",
        "answer": "The note is stored in the URL fragment, which browsers don’t send to servers in requests."
      }
    ]
  },
  "features": {
    "features": [
      "Share via URL fragment",
      "Clipboard copy",
      "Local-only processing"
    ]
  },
  "limitations": {
    "limitations": [
      "Large notes may exceed URL length limits in some browsers.",
      "Anyone with the link can read the note content."
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
