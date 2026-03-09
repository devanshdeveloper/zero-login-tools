import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const UuidGenerator = dynamic(() =>
  import("./components/UuidGenerator").then(
    (mod) => mod.UuidGenerator
  )
);

export const tool: RegistryTool = {
  slug: "uuid-generator",
  name: "UUID Generator",
  description: "Generate UUIDv4 values in bulk.",
  category: "crypto-gen",
  keywords: ["uuid generator","uuid v4"],
  component: UuidGenerator,
  relatedTools: ["password-generator"],
  icon: "hash",
  seo: {
  "title": "UUID v4 Generator | ZeroLoginTools",
  "description": "Generate secure, random UUIDv4 values quickly and in bulk.",
  "keywords": [
    "uuid gen",
    "uuidv4 generator"
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
