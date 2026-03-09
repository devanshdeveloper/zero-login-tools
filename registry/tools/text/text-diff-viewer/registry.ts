import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const TextDiffViewer = dynamic(() =>
  import("./components/TextDiffViewer").then(
    (mod) => mod.TextDiffViewer
  )
);

export const tool: RegistryTool = {
  slug: "text-diff-viewer",
  name: "Text Difference Viewer",
  description: "View detailed differences between two text documents with side-by-side and unified views.",
  category: "text",
  keywords: ["text diff","document comparison","text difference"],
  component: TextDiffViewer,
  relatedTools: ["diff-checker","json-formatter"],
  icon: "file-text",
  seo: {
  "title": "Text Difference Viewer – Compare Documents Online | ZeroLoginTools",
  "description": "Compare two text documents with detailed line and character-level differences. View changes side-by-side or in unified format.",
  "keywords": [
    "text diff",
    "document comparison",
    "text difference viewer"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Text Difference Viewer",
    "description": "Compare two text documents with comprehensive statistics. View differences in side-by-side or unified format with detailed change tracking.",
    "keywords": [
      "Compare Documents",
      "Text Diff",
      "Change Tracking"
    ]
  },
  "instructions": {
    "steps": [
      "Paste the first text in the left panel.",
      "Paste the second text in the right panel.",
      "Click 'Compare Texts' to analyze differences.",
      "Switch between side-by-side and unified views to see changes."
    ]
  },
  "benefits": {
    "benefits": [
      {
        "title": "Detailed Analysis",
        "description": "See both line-level and character-level change statistics."
      },
      {
        "title": "Multiple Views",
        "description": "Choose between side-by-side or unified diff views."
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
