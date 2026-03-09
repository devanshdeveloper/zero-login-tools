import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const CssPlayground = dynamic(() =>
  import("./components/CssPlayground").then(
    (mod) => mod.CssPlayground
  )
);

export const tool: RegistryTool = {
  slug: "css-playground",
  name: "CSS Playground",
  description: "Edit CSS (and optional HTML) and preview it live.",
  category: "playground",
  keywords: ["css playground","css preview","css sandbox"],
  component: CssPlayground,
  relatedTools: ["code-playground","css-minifier"],
  icon: "palette",
  seo: {
  "title": "CSS Playground – Live CSS Preview | ZeroLoginTools",
  "description": "Edit CSS and see changes instantly. Includes an HTML snippet for preview. Client-side only.",
  "keywords": [
    "css playground",
    "live css preview",
    "css editor"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "CSS Playground",
    "description": "Test CSS quickly with a live preview. Edit both CSS and the HTML preview snippet."
  },
  "instructions": {
    "steps": [
      "Edit HTML snippet",
      "Edit CSS",
      "Review preview"
    ]
  },
  "howToUse": {
    "content": "Adjust the HTML snippet and CSS, then view the preview in the iframe."
  },
  "howItWorks": {
    "content": "The HTML and CSS are injected into a sandboxed iframe using srcDoc."
  },
  "security": {
    "description": "Local-only. Preview is isolated in an iframe."
  },
  "faq": {
    "faqs": [
      {
        "question": "Can I use external fonts?",
        "answer": "You can, but remote assets may be blocked by CORS depending on source."
      },
      {
        "question": "Does it support Tailwind?",
        "answer": "Not automatically. This tool is for plain CSS."
      }
    ]
  },
  "features": {
    "features": [
      "Live CSS preview",
      "Editable HTML snippet",
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
