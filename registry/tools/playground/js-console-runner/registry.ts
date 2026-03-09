import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const JsConsoleRunner = dynamic(() =>
  import("./components/JsConsoleRunner").then(
    (mod) => mod.JsConsoleRunner
  )
);

export const tool: RegistryTool = {
  slug: "js-console-runner",
  name: "JS Console Runner",
  description: "Run JavaScript and capture console.log/info/warn/error output.",
  category: "playground",
  keywords: ["run javascript","console runner","js runner"],
  component: JsConsoleRunner,
  relatedTools: ["code-playground","js-minifier"],
  icon: "terminal",
  seo: {
  "title": "JavaScript Console Runner | ZeroLoginTools",
  "description": "Run JavaScript in a sandboxed iframe and view console output. Private and client-side.",
  "keywords": [
    "javascript runner",
    "console.log viewer",
    "run js online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Run JavaScript + View Console Output",
    "description": "Test small JavaScript snippets and see console output immediately. Runs locally inside a sandboxed iframe."
  },
  "instructions": {
    "steps": [
      "Paste JavaScript",
      "Click Run",
      "Review console output"
    ]
  },
  "howToUse": {
    "content": "Paste or write JavaScript, click Run, and inspect console output in the right panel."
  },
  "howItWorks": {
    "content": "Your code executes inside a sandboxed iframe that forwards console messages to the parent page."
  },
  "security": {
    "description": "Client-side only. Code runs in a sandboxed iframe for isolation."
  },
  "faq": {
    "faqs": [
      {
        "question": "Is this a full Node.js environment?",
        "answer": "No. This runs in the browser’s JavaScript runtime with standard web APIs."
      },
      {
        "question": "Can this access my cookies or page DOM?",
        "answer": "The runner is sandboxed and isolated from the main page’s DOM."
      }
    ]
  },
  "features": {
    "features": [
      "console.log capture",
      "Sandboxed execution",
      "Clear output"
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
