import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const JsMinifier = dynamic(() =>
  import("./components/JsMinifier").then(
    (mod) => mod.JsMinifier
  )
);

export const tool: RegistryTool = {
  slug: "js-minifier",
  name: "JavaScript Minifier",
  description: "Minify JavaScript code to reduce file size and improve load times.",
  category: "web-dev",
  keywords: ["js minifier","minify javascript","compress js"],
  component: JsMinifier,
  relatedTools: ["html-minifier","css-minifier"],
  icon: "code",
  seo: {
  "title": "JavaScript Minifier – Compress JS Online | ZeroLoginTools",
  "description": "Minify and compress your JavaScript code instantly. Reduce file size without changing functionality.",
  "keywords": [
    "js minifier",
    "minify javascript",
    "compress js"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "JavaScript Minifier",
    "description": "Optimize your JavaScript files by removing comments, whitespace, and unnecessary characters. Perfect for production builds.",
    "keywords": [
      "Minify JS",
      "Compress JavaScript",
      "Optimize JS"
    ]
  },
  "instructions": {
    "steps": [
      "Paste your JavaScript code into the input area.",
      "Click 'Minify JavaScript' to process the code.",
      "View compression statistics and copy the minified output."
    ]
  },
  "benefits": {
    "benefits": [
      {
        "title": "Faster Execution",
        "description": "Smaller files parse and execute faster in browsers."
      },
      {
        "title": "Better Performance",
        "description": "Reduce bandwidth usage and improve user experience."
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
