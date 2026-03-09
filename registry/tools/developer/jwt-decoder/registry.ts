import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const JwtDecoder = dynamic(() =>
  import("./components/JwtDecoder").then(
    (mod) => mod.JwtDecoder
  )
);

export const tool: RegistryTool = {
  slug: "jwt-decoder",
  name: "JWT Decoder",
  description: "Decode JSON Web Tokens securely.",
  category: "developer",
  keywords: ["jwt decode","json web token"],
  component: JwtDecoder,
  relatedTools: ["base64-encoder","json-formatter"],
  icon: "shield",
  seo: {
  "title": "JWT Decoder | ZeroLoginTools",
  "description": "Decode and inspect JSON Web Tokens securely without sending them to a server.",
  "keywords": [
    "decode jwt",
    "jwt parser",
    "json web token decoder"
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
