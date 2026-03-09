import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const DiffChecker = dynamic(() =>
  import("./components/DiffChecker").then(
    (mod) => mod.DiffChecker
  )
);

export const tool: RegistryTool = {
  slug: "diff-checker",
  name: "Diff Checker",
  description: "Compare two text files or code snippets and see the differences.",
  category: "developer",
  keywords: ["diff checker","text diff","code comparison"],
  component: DiffChecker,
  relatedTools: ["text-diff-viewer","json-formatter"],
  icon: "git-compare",
  seo: {
  "title": "Diff Checker – Compare Text & Code Online | ZeroLoginTools",
  "description": "Compare two versions of text or code and see line-by-line differences. Perfect for code reviews and version control.",
  "keywords": [
    "diff checker",
    "text diff",
    "code comparison"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Diff Checker",
    "description": "Compare two versions of text or code side-by-side. See exactly what changed with color-coded additions, deletions, and modifications.",
    "keywords": [
      "Compare Text",
      "Code Diff",
      "Version Comparison"
    ]
  },
  "instructions": {
    "steps": [
      "Paste the original version in the left panel.",
      "Paste the new version in the right panel.",
      "Click 'Compare' to see the differences highlighted.",
      "Review statistics and copy the diff output if needed."
    ]
  },
  "benefits": {
    "benefits": [
      {
        "title": "Code Reviews",
        "description": "Quickly identify changes in code reviews and pull requests."
      },
      {
        "title": "Version Tracking",
        "description": "See exactly what changed between document versions."
      }
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
