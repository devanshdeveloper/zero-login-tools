import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const LatexPreview = dynamic(() =>
  import("./components/LatexPreview").then(
    (mod) => mod.LatexPreview
  )
);

export const tool: RegistryTool = {
  slug: "latex-preview",
  name: "LaTeX Preview",
  description: "Preview LaTeX math expressions and copy the rendered HTML output.",
  category: "documents",
  keywords: ["latex preview","katex","latex renderer"],
  component: LatexPreview,
  relatedTools: ["markdown-preview","markdown-to-pdf"],
  icon: "sigma",
  seo: {
  "title": "LaTeX Preview – Render Math with KaTeX | ZeroLoginTools",
  "description": "Render LaTeX math instantly in your browser. Preview output and copy KaTeX HTML.",
  "keywords": [
    "latex preview",
    "katex",
    "render latex"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "LaTeX Math Preview",
    "description": "Preview LaTeX math expressions instantly using KaTeX. Great for docs, Markdown, and technical writing."
  },
  "instructions": {
    "steps": [
      "Paste a LaTeX expression.",
      "Toggle display mode if needed.",
      "Copy the rendered HTML if you want to embed it elsewhere."
    ]
  },
  "howToUse": {
    "content": "Paste your LaTeX expression and view the rendered result. If you need it, copy the HTML output for embedding."
  },
  "howItWorks": {
    "content": "The tool uses KaTeX to parse LaTeX into HTML and CSS for fast client-side rendering."
  },
  "security": {
    "description": "All rendering occurs locally in your browser."
  },
  "faq": {
    "faqs": [
      {
        "question": "Does this support full LaTeX documents?",
        "answer": "This is focused on math expressions. Full LaTeX documents require a TeX engine."
      },
      {
        "question": "Why do I see an error but still get output?",
        "answer": "When possible, KaTeX renders a best-effort preview even if some tokens are invalid."
      }
    ]
  },
  "features": {
    "features": [
      "KaTeX rendering",
      "Display mode toggle",
      "Copy rendered HTML"
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
