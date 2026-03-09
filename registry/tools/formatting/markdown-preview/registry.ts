import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(() =>
  import("./components/MarkdownPreview").then(
    (mod) => mod.MarkdownPreview
  )
);

export const tool: RegistryTool = {
  slug: "markdown-preview",
  name: "Markdown Preview",
  description: "Live preview of Markdown as you type. No conversion, just preview.",
  category: "formatting",
  keywords: ["markdown preview","markdown editor","live preview"],
  component: MarkdownPreview,
  relatedTools: ["markdown-html","html-to-markdown"],
  icon: "eye",
  seo: {
  "title": "Markdown Preview – Live Preview Online | ZeroLoginTools",
  "description": "See a live preview of your Markdown as you type. No sign-up. All processing in your browser.",
  "keywords": [
    "markdown preview",
    "markdown live preview",
    "markdown editor"
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
