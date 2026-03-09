import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const SqlFormatter = dynamic(() =>
  import("./components/SqlFormatter").then(
    (mod) => mod.SqlFormatter
  )
);

export const tool: RegistryTool = {
  slug: "sql-formatter",
  name: "SQL Formatter",
  description: "Format SQL queries for readability (Postgres/MySQL/SQLite/T-SQL).",
  category: "playground",
  keywords: ["sql formatter","format sql","pretty sql"],
  component: SqlFormatter,
  relatedTools: ["sql-visualizer","json-formatter"],
  icon: "code",
  seo: {
  "title": "SQL Formatter – Pretty Print SQL | ZeroLoginTools",
  "description": "Format SQL queries instantly for readability. Client-side formatting with common dialect options.",
  "keywords": [
    "sql formatter",
    "pretty print sql",
    "format sql online"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Format SQL Instantly",
    "description": "Paste SQL and get a clean, readable formatted query. Choose a dialect that matches your SQL flavor."
  },
  "instructions": {
    "steps": [
      "Paste SQL",
      "Choose dialect",
      "Copy formatted output"
    ]
  },
  "howToUse": {
    "content": "Paste SQL into the input, select the dialect, and copy the formatted output."
  },
  "howItWorks": {
    "content": "A client-side SQL formatter parses and reprints your query with consistent indentation and casing."
  },
  "security": {
    "description": "No uploads. Formatting runs locally."
  },
  "faq": {
    "faqs": [
      {
        "question": "Will it change query semantics?",
        "answer": "Formatting should not change semantics, but always review output if you have complex vendor-specific syntax."
      },
      {
        "question": "Does it validate SQL?",
        "answer": "It’s primarily a formatter; it may fail on invalid SQL, but it’s not a full database validator."
      }
    ]
  },
  "features": {
    "features": [
      "Dialect selection",
      "Readable indentation",
      "Copy output"
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
