import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const CodePlayground = dynamic(() =>
  import("./components/CodePlayground").then(
    (mod) => mod.CodePlayground
  )
);

export const tool: RegistryTool = {
  slug: "code-playground",
  name: "Code Playground",
  description: "Edit HTML/CSS/JS together and preview in a sandboxed iframe.",
  category: "playground",
  keywords: ["code playground","html css js playground","sandbox"],
  component: CodePlayground,
  relatedTools: ["html-playground","css-playground","js-console-runner"],
  icon: "code",
  seo: {
  "title": "Code Playground – HTML/CSS/JS Sandbox | ZeroLoginTools",
  "description": "A client-side code playground for HTML, CSS, and JavaScript with live preview. No login required.",
  "keywords": [
    "code playground",
    "html css js sandbox",
    "client-side playground"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "HTML/CSS/JS Code Playground",
    "description": "Prototype UI and scripts quickly with a simple in-browser sandbox. Live preview runs inside a sandboxed iframe."
  },
  "instructions": {
    "steps": [
      "Edit HTML, CSS, and JavaScript.",
      "Watch the preview update.",
      "Open the preview in a new tab if needed."
    ]
  },
  "howToUse": {
    "content": "Use the editors to modify HTML/CSS/JS and view output in the preview pane."
  },
  "howItWorks": {
    "content": "Your code is injected into an iframe using srcDoc with a sandbox policy to keep execution isolated."
  },
  "security": {
    "description": "Everything runs locally. The preview is isolated in a sandboxed iframe."
  },
  "faq": {
    "faqs": [
      {
        "question": "Is this like CodePen?",
        "answer": "It’s a lightweight client-side sandbox for quick testing and prototyping."
      },
      {
        "question": "Can it access my local files?",
        "answer": "No. The iframe sandbox prevents direct file access."
      }
    ]
  },
  "features": {
    "features": [
      "Live preview",
      "Sandboxed iframe",
      "Open preview in new tab"
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
