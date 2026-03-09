import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const HtmlPlayground = dynamic(() =>
  import("./components/HtmlPlayground").then(
    (mod) => mod.HtmlPlayground
  )
);

export const tool: RegistryTool = {
  slug: "html-playground",
  name: "HTML Playground",
  description: "Edit HTML and preview it instantly in a sandboxed iframe.",
  category: "playground",
  keywords: ["html playground","html preview","html sandbox"],
  component: HtmlPlayground,
  relatedTools: ["code-playground","html-minifier","markdown-html"],
  icon: "code",
  seo: {
  "title": "HTML Playground – Live Preview | ZeroLoginTools",
  "description": "Write HTML and see the preview instantly. Client-side sandbox with no login required.",
  "keywords": [
    "html playground",
    "html preview",
    "live html editor"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "HTML Playground",
    "description": "A simple live HTML editor and preview. Great for quick snippets and layout tests."
  },
  "instructions": {
    "steps": [
      "Edit HTML",
      "See preview",
      "Open preview in new tab (optional)"
    ]
  },
  "howToUse": {
    "content": "Edit the HTML and watch the preview update in the iframe."
  },
  "howItWorks": {
    "content": "Your HTML is loaded into a sandboxed iframe via srcDoc for isolation."
  },
  "security": {
    "description": "Local-only. Preview runs in a sandboxed iframe."
  },
  "faq": {
    "faqs": [
      {
        "question": "Will scripts run?",
        "answer": "Basic scripts may run inside the sandboxed iframe, but permissions are restricted."
      },
      {
        "question": "Is it stored?",
        "answer": "No. Refreshing may clear your content."
      }
    ]
  },
  "features": {
    "features": [
      "Live preview",
      "Sandboxed iframe",
      "Open preview"
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
