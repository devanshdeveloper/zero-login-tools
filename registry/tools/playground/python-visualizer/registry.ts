import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const PythonVisualizer = dynamic(() =>
  import("./components/PythonVisualizer").then(
    (mod) => mod.PythonVisualizer
  )
);

export const tool: RegistryTool = {
  slug: "python-visualizer",
  name: "Python Visualizer",
  description: "Run Python locally in your browser (Pyodide) and view stdout + globals.",
  category: "playground",
  keywords: ["python runner","pyodide","python in browser"],
  component: PythonVisualizer,
  relatedTools: ["code-playground","json-formatter"],
  icon: "terminal",
  seo: {
  "title": "Python Visualizer – Run Python in Browser | ZeroLoginTools",
  "description": "Execute Python client-side via Pyodide. View stdout and a best-effort globals snapshot. No backend.",
  "keywords": [
    "python in browser",
    "pyodide",
    "python runner"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Python Visualizer (Client-Side)",
    "description": "Run Python code directly in your browser using Pyodide. Great for quick experiments without installing anything."
  },
  "instructions": {
    "steps": [
      "Click “Load Python runtime” (first time).",
      "Paste Python code.",
      "Click Run and view stdout."
    ]
  },
  "howToUse": {
    "content": "Load the runtime once, then run Python snippets and inspect output and basic globals."
  },
  "howItWorks": {
    "content": "Pyodide loads a WebAssembly-based Python runtime in the browser and executes your code locally."
  },
  "security": {
    "description": "No server execution. Code runs in your browser. Loading the runtime requires a network request to a public CDN."
  },
  "faq": {
    "faqs": [
      {
        "question": "Is Python executed on a server?",
        "answer": "No. Execution happens in your browser through Pyodide (WASM)."
      },
      {
        "question": "Does it work offline?",
        "answer": "After the runtime is loaded and cached it may work offline, but initial load requires internet."
      }
    ]
  },
  "features": {
    "features": [
      "Client-side Python",
      "Stdout output",
      "Globals snapshot (best effort)"
    ]
  },
  "limitations": {
    "limitations": [
      "Initial runtime download can be large.",
      "Only a subset of Python packages are available unless installed via Pyodide."
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
