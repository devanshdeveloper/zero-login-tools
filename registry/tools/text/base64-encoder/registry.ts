import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const Base64Editor = dynamic(() =>
  import("./components/Base64Editor").then(
    (mod) => mod.Base64Editor
  )
);

export const tool: RegistryTool = {
  slug: "base64-encoder",
  name: "Base64 Encoder/Decoder",
  description: "Encode and decode Base64 text.",
  category: "text",
  keywords: ["base64 encode","base64 decode","base64 tool"],
  component: Base64Editor,
  relatedTools: ["url-encoder","json-formatter"],
  icon: "arrow-right-left",
  seo: {
  "title": "Base64 Encoder & Decoder | ZeroLoginTools",
  "description": "Instantly encode text to Base64 or decode Base64 to text. Fast, secure, and entirely client-side.",
  "keywords": [
    "encode base64",
    "decode base64",
    "base64 converter"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Base64 Encoder & Decoder",
    "description": "Easily convert plain text into Base64 format, or decode Base64 back into readable text. Essential for web development and data transport.",
    "keywords": [
      "Encode",
      "Decode",
      "Base64"
    ]
  },
  "instructions": {
    "steps": [
      "Select whether you want to 'Encode' or 'Decode' using the toggle buttons.",
      "Paste your text into the input field.",
      "The converted result will instantly appear in the output box.",
      "Click 'Copy' to copy the result to your clipboard."
    ]
  },
  "examples": {
    "examples": [
      {
        "label": "Encoding Example",
        "input": "Hello World",
        "output": "SGVsbG8gV29ybGQ="
      }
    ]
  },
  "benefits": {
    "benefits": [
      {
        "title": "Bi-directional",
        "description": "Seamlessly switch between encoding and decoding operations."
      },
      {
        "title": "Privacy First",
        "description": "All conversion is handled safely in the browser."
      }
    ]
  },
  "features": {
    "features": [
      "Auto-conversion on type",
      "Handles standard text arrays",
      "Fast clipboard access"
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
