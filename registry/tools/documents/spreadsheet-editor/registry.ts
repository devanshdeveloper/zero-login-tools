import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const SpreadsheetEditor = dynamic(() =>
  import("./components/SpreadsheetEditor").then(
    (mod) => mod.SpreadsheetEditor
  )
);

export const tool: RegistryTool = {
  slug: "spreadsheet-editor",
  name: "Spreadsheet Editor",
  description: "Edit CSV data in a lightweight spreadsheet-style table and export CSV.",
  category: "documents",
  keywords: ["csv editor","spreadsheet editor","edit csv online"],
  component: SpreadsheetEditor,
  relatedTools: ["simple-text-editor","json-formatter"],
  icon: "table",
  seo: {
  "title": "CSV Spreadsheet Editor – Edit CSV Online | ZeroLoginTools",
  "description": "Paste CSV, edit cells in a simple grid, then export or copy CSV. Fully client-side.",
  "keywords": [
    "csv editor",
    "spreadsheet",
    "edit csv"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "CSV Spreadsheet Editor",
    "description": "Edit CSV quickly with a simple grid UI. Copy the output or download as a .csv file."
  },
  "instructions": {
    "steps": [
      "Paste CSV and load into the table.",
      "Edit any cell directly.",
      "Copy or download the updated CSV."
    ]
  },
  "howToUse": {
    "content": "Load CSV into the table, edit values, then copy/download the output CSV."
  },
  "howItWorks": {
    "content": "CSV text is parsed into a 2D array in your browser. Edits update the array and are re-serialized to CSV on demand."
  },
  "security": {
    "description": "No uploads. CSV parsing and editing are local."
  },
  "faq": {
    "faqs": [
      {
        "question": "Does this support Excel .xlsx files?",
        "answer": "No. This tool is CSV-based for speed and simplicity."
      },
      {
        "question": "Can I add rows and columns?",
        "answer": "Yes — use the buttons to add rows or columns."
      }
    ]
  },
  "features": {
    "features": [
      "CSV input/output",
      "Editable grid",
      "Download .csv"
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
