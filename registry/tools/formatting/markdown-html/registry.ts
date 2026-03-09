import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() =>
  import("./components/MarkdownEditor").then(
    (mod) => mod.MarkdownEditor
  )
);

export const tool: RegistryTool = {
  slug: "markdown-html",
  name: "Markdown to HTML",
  description: "Convert Markdown to valid HTML instantly.",
  category: "formatting",
  keywords: ["markdown to html","markdown editor"],
  component: MarkdownEditor,
  relatedTools: ["json-formatter"],
  icon: "code",
  seo: {
  "title": "Markdown to HTML Converter | ZeroLoginTools",
  "description": "Write markdown and instantly preview and grab the HTML equivalent.",
  "keywords": [
    "markdown html",
    "convert markdown"
  ]
},
  contentBlocks: undefined,
  flags: {
    supports_batch: false,
    supports_chain: false,
    cli_supported: false,
    benchmark_available: false,
    embeddable: false,
  },
};
