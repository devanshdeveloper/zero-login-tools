import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const SqlVisualizer = dynamic(() =>
  import("./components/SqlVisualizer").then(
    (mod) => mod.SqlVisualizer
  )
);

export const tool: RegistryTool = {
  slug: "sql-visualizer",
  name: "SQL Visualizer",
  description: "Parse SQL into an AST (JSON) for inspection and debugging.",
  category: "playground",
  keywords: ["sql ast","sql parser","sql visualizer"],
  component: SqlVisualizer,
  relatedTools: ["sql-formatter"],
  icon: "network",
  seo: {
  "title": "SQL Visualizer – View SQL AST | ZeroLoginTools",
  "description": "Visualize SQL by parsing it into an AST (JSON). Useful for debugging and learning how SQL parses.",
  "keywords": [
    "sql visualizer",
    "sql ast",
    "sql parser online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "SQL to AST Visualizer",
    "description": "See how a SQL statement parses by converting it into a JSON AST. Great for analysis and tooling experiments."
  },
  "instructions": {
    "steps": [
      "Paste SQL",
      "View the AST output",
      "Copy as JSON"
    ]
  },
  "howToUse": {
    "content": "Paste a SQL query and view the parsed AST. Copy the AST JSON if you need it for debugging."
  },
  "howItWorks": {
    "content": "A client-side SQL parser generates an abstract syntax tree (AST) from your input and prints it as JSON."
  },
  "security": {
    "description": "Local parsing only. No network calls for your SQL content."
  },
  "faq": {
    "faqs": [
      {
        "question": "Why doesn’t my SQL parse?",
        "answer": "Some vendor-specific syntax isn’t supported by the parser. Try simplifying or switching to a more standard form."
      },
      {
        "question": "Is the AST standardized?",
        "answer": "AST shape depends on the parser library. It’s designed for programmatic analysis."
      }
    ]
  },
  "features": {
    "features": [
      "AST output",
      "Copy JSON",
      "Client-side parsing"
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
