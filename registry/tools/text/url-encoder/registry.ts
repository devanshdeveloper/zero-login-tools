import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const UrlEditor = dynamic(() =>
  import("./components/UrlEditor").then(
    (mod) => mod.UrlEditor
  )
);

export const tool: RegistryTool = {
  slug: "url-encoder",
  name: "URL Encoder/Decoder",
  description: "Safely encode or decode URLs.",
  category: "text",
  keywords: ["url encode","urldecode"],
  component: UrlEditor,
  relatedTools: ["base64-encoder"],
  icon: "link",
  seo: {
  "title": "URL Encoder & Decoder | ZeroLoginTools",
  "description": "Safely encode or decode URLs to ensure safe transmission over the internet.",
  "keywords": [
    "url encode",
    "url decode"
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
