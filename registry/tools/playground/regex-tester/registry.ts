import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const RegexTester = dynamic(() =>
  import("./components/RegexTester").then(
    (mod) => mod.RegexTester
  )
);

export const tool: RegistryTool = {
  slug: "regex-tester",
  name: "Regex Tester",
  description: "Test JavaScript regex patterns, view matches/groups, and preview replacements.",
  category: "playground",
  keywords: ["regex tester","regex replace","regular expression tester"],
  component: RegexTester,
  relatedTools: ["regex-visualizer","text-diff-viewer"],
  icon: "search",
  seo: {
  "title": "Regex Tester – Matches + Replace Preview | ZeroLoginTools",
  "description": "Test JavaScript regular expressions against text. See matches, capture groups, and replacement output.",
  "keywords": [
    "regex tester",
    "regex replace",
    "javascript regex tester"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Regex Tester (JavaScript)",
    "description": "Quickly debug regex patterns. See matches and capture groups and test a replacement string."
  },
  "instructions": {
    "steps": [
      "Enter a regex pattern and flags.",
      "Paste test text.",
      "Review matches and replacement preview."
    ]
  },
  "howToUse": {
    "content": "Use the pattern + flags inputs to define your regex. Matches update instantly as you edit text."
  },
  "howItWorks": {
    "content": "The tool uses the browser’s JavaScript RegExp engine to execute matches and replacements locally."
  },
  "security": {
    "description": "All processing is local in your browser."
  },
  "faq": {
    "faqs": [
      {
        "question": "Which regex flavor is this?",
        "answer": "JavaScript regular expressions (ECMAScript)."
      },
      {
        "question": "Can a regex freeze the page?",
        "answer": "Some patterns can be slow on large inputs. If the page becomes slow, reduce input size or simplify the pattern."
      }
    ]
  },
  "features": {
    "features": [
      "Matches + groups",
      "Flag support",
      "Replace preview"
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
