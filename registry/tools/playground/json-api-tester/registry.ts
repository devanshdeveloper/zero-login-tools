import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const JsonApiTester = dynamic(() =>
  import("./components/JsonApiTester").then(
    (mod) => mod.JsonApiTester
  )
);

export const tool: RegistryTool = {
  slug: "json-api-tester",
  name: "JSON API Tester",
  description: "Send HTTP requests from your browser and inspect JSON responses.",
  category: "playground",
  keywords: ["api tester","http client","json api tester"],
  component: JsonApiTester,
  relatedTools: ["json-formatter","jwt-decoder"],
  icon: "send",
  seo: {
  "title": "JSON API Tester – Send Requests in Browser | ZeroLoginTools",
  "description": "Test APIs by sending requests from your browser. Inspect status, headers, and response body. Client-side only.",
  "keywords": [
    "api tester",
    "http request tester",
    "json api tester"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Test JSON APIs (Client-Side)",
    "description": "Send GET/POST requests and inspect the response. Great for quick checks — with the usual browser CORS limitations."
  },
  "instructions": {
    "steps": [
      "Choose an HTTP method and URL.",
      "Set headers and body if needed.",
      "Send the request and inspect the response."
    ]
  },
  "howToUse": {
    "content": "Enter a URL, add headers/body, then send the request. If a request fails, it may be blocked by CORS."
  },
  "howItWorks": {
    "content": "Requests are made using the browser fetch API. Responses are displayed as text or pretty-printed JSON when possible."
  },
  "security": {
    "description": "Requests come from your browser. Be careful with API keys and tokens in shared environments."
  },
  "limitations": {
    "limitations": [
      "CORS can block requests to many third-party APIs.",
      "This tool cannot bypass browser security policies."
    ]
  },
  "faq": {
    "faqs": [
      {
        "question": "Why do I get a CORS error?",
        "answer": "Many APIs do not allow browser-origin requests. You may need to call the API from your own backend in those cases."
      },
      {
        "question": "Does this store my headers or tokens?",
        "answer": "No. Inputs stay in-memory in your browser session."
      }
    ]
  },
  "features": {
    "features": [
      "GET/POST/etc",
      "Headers + body",
      "Pretty JSON responses"
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
