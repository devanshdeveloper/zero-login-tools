import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PasswordGenerator = dynamic(() =>
  import("./components/PasswordGenerator").then(
    (mod) => mod.PasswordGenerator
  )
);

export const tool: RegistryTool = {
  slug: "password-generator",
  name: "Password Generator",
  description: "Create strong customized passwords.",
  category: "crypto-gen",
  keywords: ["password generator","secure passwords"],
  component: PasswordGenerator,
  relatedTools: ["uuid-generator"],
  icon: "key",
  seo: {
  "title": "Secure Password Generator | ZeroLoginTools",
  "description": "Create highly secure, randomized passwords locally in your browser.",
  "keywords": [
    "generate password",
    "secure password",
    "random string generator"
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
