import { RegistryTool } from "@/registry/types";
import JsonEditor from "./render";

export const tool: RegistryTool = {
  slug: "json-formatter",
  name: "JSON Formatter",
  description: "Format, validate, and minify JSON strings.",
  category: "developer",
  keywords: ["json formatter", "json validator", "format json online"],
  component: JsonEditor,
  relatedTools: ["base64-encoder", "jwt-decoder"],
  icon: "braces",
  popular: true,
  seo: {
    title: "JSON Formatter – Format & Validate JSON Online | ZeroLoginTools",
    description:
      "Format and validate JSON instantly with this free online JSON formatter. No login required.",
    keywords: ["json formatter", "json validator", "json beautifier"],
  },
  flags: {
    supports_batch: true,
    supports_chain: true,
    cli_supported: true,
    benchmark_available: true,
    embeddable: true,
  },
  contentBlocks: {
    intro: {
      title: "JSON Formatter & Validator",
      description:
        "Format, validate, and beautify your JSON data instantly in your browser. Our tool ensures your JSON is perfectly structured and highlights any syntax errors immediately.",
      keywords: ["Format JSON", "Validate JSON", "Minify JSON"],
    },
    instructions: {
      steps: [
        "Paste your raw or minified JSON text into the input panel on the left.",
        "Any syntax errors will be highlighted immediately.",
        "Click the 'Format' button to beautify the JSON, or the 'Minify' button to strip all whitespace.",
        "Use the copy button to grab the formatted output.",
      ],
    },
    examples: {
      examples: [
        {
          label: "Minified to Formatted",
          input: '{"name":"John","age":30,"city":"New York"}',
          output: '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}',
        },
      ],
    },
    benefits: {
      benefits: [
        {
          title: "Instant Rendering",
          description: "Processes JSON directly in your browser without lag.",
        },
        {
          title: "Syntax Highlighting",
          description:
            "Easily spot keys, strings, and numbers with color coding.",
        },
        {
          title: "Error Detection",
          description: "Instantly notifies you of malformed JSON structures.",
        },
      ],
    },
    faq: {
      faqs: [
        {
          question: "Is my JSON data uploaded to your servers?",
          answer:
            "No. All formatting and validation happens strictly within your browser. Your data never leaves your device.",
        },
        {
          question: "Can it handle large JSON files?",
          answer:
            "Yes, it can seamlessly format large JSON structures up to several megabytes, limited only by your browser's memory.",
        },
      ],
    },
    features: {
      features: [
        "1-click indentation",
        "MinifyJSON support",
        "Syntax validation",
        "Local processing",
      ],
    },
  },
};
