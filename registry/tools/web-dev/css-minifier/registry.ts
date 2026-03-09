import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const CssMinifier = dynamic(() =>
  import("./components/CssMinifier").then(
    (mod) => mod.CssMinifier
  )
);

export const tool: RegistryTool = {
  slug: "css-minifier",
  name: "CSS Minifier",
  description: "Minify CSS code to reduce file size and improve performance.",
  category: "web-dev",
  keywords: ["css minifier","minify css","compress css"],
  component: CssMinifier,
  relatedTools: ["html-minifier","js-minifier"],
  icon: "palette",
  seo: {
  "title": "CSS Minifier – Compress CSS Online | ZeroLoginTools",
  "description": "Minify and compress your CSS code instantly. Reduce file size and improve website performance.",
  "keywords": [
    "css minifier",
    "minify css",
    "compress css"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "CSS Minifier",
    "description": "Optimize your CSS files by removing whitespace, comments, and unnecessary characters. All processing happens client-side.",
    "keywords": [
      "Minify CSS",
      "Compress CSS",
      "Optimize CSS"
    ]
  },
  "instructions": {
    "steps": [
      "Paste your CSS code into the input area.",
      "Click 'Minify CSS' to process the stylesheet.",
      "View compression statistics and copy the optimized output."
    ]
  },
  "benefits": {
    "benefits": [
      {
        "title": "Performance Boost",
        "description": "Smaller CSS files load faster and improve page speed."
      },
      {
        "title": "Production Ready",
        "description": "Get minified CSS perfect for production deployments."
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
