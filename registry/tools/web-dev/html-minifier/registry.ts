import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const HtmlMinifier = dynamic(() =>
  import("./components/HtmlMinifier").then(
    (mod) => mod.HtmlMinifier
  )
);

export const tool: RegistryTool = {
  slug: "html-minifier",
  name: "HTML Minifier",
  description: "Minify HTML code to reduce file size and improve load times.",
  category: "web-dev",
  keywords: ["html minifier","minify html","compress html"],
  component: HtmlMinifier,
  relatedTools: ["css-minifier","js-minifier"],
  icon: "code",
  seo: {
  "title": "HTML Minifier – Compress HTML Online | ZeroLoginTools",
  "description": "Minify and compress your HTML code instantly. Reduce file size without losing functionality.",
  "keywords": [
    "html minifier",
    "minify html",
    "compress html"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "HTML Minifier",
    "description": "Reduce your HTML file size by removing unnecessary whitespace, comments, and formatting. All processing happens in your browser.",
    "keywords": [
      "Minify HTML",
      "Compress HTML",
      "Optimize HTML"
    ]
  },
  "instructions": {
    "steps": [
      "Paste your HTML code into the input area.",
      "Click 'Minify HTML' to process the code.",
      "View compression statistics and copy the minified output."
    ]
  },
  "benefits": {
    "benefits": [
      {
        "title": "Faster Load Times",
        "description": "Smaller files mean faster page loads for your users."
      },
      {
        "title": "Bandwidth Savings",
        "description": "Reduce data transfer costs with smaller HTML files."
      }
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
