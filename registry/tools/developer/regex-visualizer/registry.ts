import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const RegexVisualizer = dynamic(() =>
  import("./components/RegexVisualizer").then(
    (mod) => mod.RegexVisualizer
  )
);

export const tool: RegistryTool = {
  slug: "regex-visualizer",
  name: "Regex Visualizer",
  description: "Test and visualize regular expressions with real-time matching.",
  category: "developer",
  keywords: ["regex tester","regex visualizer","regex matcher"],
  component: RegexVisualizer,
  relatedTools: ["json-formatter","jwt-decoder"],
  icon: "search",
  seo: {
  "title": "Regex Visualizer & Tester | ZeroLoginTools",
  "description": "Test and visualize regular expressions in real-time. See matches, groups, and flags instantly.",
  "keywords": [
    "regex tester",
    "regex visualizer",
    "regular expression tester"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Regex Visualizer & Tester",
    "description": "Test your regular expressions against sample text and see matches highlighted in real-time. Perfect for debugging and learning regex patterns.",
    "keywords": [
      "Test Regex",
      "Visualize Matches",
      "Debug Patterns"
    ]
  },
  "instructions": {
    "steps": [
      "Enter your regular expression pattern in the input field.",
      "Select flags (g for global, i for case-insensitive, etc.).",
      "Type or paste your test string in the text area.",
      "Click 'Test' to see all matches highlighted with groups and indices."
    ]
  },
  "examples": {
    "examples": [
      {
        "label": "Email Pattern",
        "input": "test@example.com",
        "output": "Match 1: 'test@example.com' at index 0"
      }
    ]
  },
  "faq": {
    "faqs": [
      {
        "question": "What regex flags are supported?",
        "answer": "All standard JavaScript regex flags: g (global), i (case-insensitive), m (multiline), s (dotall), u (unicode), and y (sticky)."
      },
      {
        "question": "Can I test complex regex patterns?",
        "answer": "Yes, the tool supports all JavaScript regex features including lookaheads, groups, and quantifiers."
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
