import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const HtmlToMarkdown = dynamic(() =>
  import("./components/HtmlToMarkdown").then(
    (mod) => mod.HtmlToMarkdown
  )
);

export const tool: RegistryTool = {
  slug: "html-to-markdown",
  name: "HTML to Markdown",
  description: "Convert HTML to Markdown. Paste HTML and get clean Markdown output.",
  category: "formatting",
  keywords: ["html to markdown","convert html to markdown"],
  component: HtmlToMarkdown,
  relatedTools: ["markdown-html","markdown-preview"],
  icon: "code",
  seo: {
  "title": "HTML to Markdown Converter | ZeroLoginTools",
  "description": "Convert HTML to Markdown instantly. Paste your HTML and get clean Markdown. Client-side only.",
  "keywords": [
    "html to markdown",
    "convert html",
    "html converter"
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
