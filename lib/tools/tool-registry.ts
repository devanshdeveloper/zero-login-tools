import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { FAQItem } from "@/components/content/FAQ";
import { Example } from "@/components/content/ToolExamples";
import { Benefit } from "@/components/content/ToolBenefits";
import { ChangelogItem } from "@/components/content/ToolChangelog";

export type ToolCategory =
  | "formatting"
  | "text"
  | "crypto-gen"
  | "converters"
  | "web-dev"
  | "media"
  | "developer"
  | "security"
  | "image";

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ToolContentBlocks {
  intro?: { title: string; description: string; keywords?: string[] };
  instructions?: { title?: string; steps: string[] };
  examples?: { title?: string; examples: Example[] };
  howToUse?: { title?: string; content: ReactNode | string };
  howItWorks?: { title?: string; content: ReactNode | string };
  benefits?: { title?: string; benefits: Benefit[] };
  features?: { title?: string; features: string[] };
  security?: { title?: string; description?: string };
  faq?: { title?: string; faqs: FAQItem[] };
  limitations?: { title?: string; limitations: string[] };
  changelog?: { title?: string; items: ChangelogItem[] };
}

export interface ToolDefinition {
  slug: string; // Used as id and URL param
  name: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  relatedTools: string[];
  icon: string;
  seo: ToolSEO;
  contentBlocks?: ToolContentBlocks;
  popular?: boolean;
  new?: boolean;
}

export type ToolSummary = Omit<ToolDefinition, "component">;

// Map the dynamic imports
const JsonEditor = dynamic(() =>
  import("@/components/tool/json-formatter/JsonEditor").then(
    (mod) => mod.JsonEditor,
  ),
);
const Base64Editor = dynamic(() =>
  import("@/components/tool/base64-encoder/Base64Editor").then(
    (mod) => mod.Base64Editor,
  ),
);
const UrlEditor = dynamic(() =>
  import("@/components/tool/url-encoder/UrlEditor").then(
    (mod) => mod.UrlEditor,
  ),
);
const UuidGenerator = dynamic(() =>
  import("@/components/tool/uuid-generator/UuidGenerator").then(
    (mod) => mod.UuidGenerator,
  ),
);
const PasswordGenerator = dynamic(() =>
  import("@/components/tool/password-generator/PasswordGenerator").then(
    (mod) => mod.PasswordGenerator,
  ),
);
const MarkdownEditor = dynamic(() =>
  import("@/components/tool/markdown-html/MarkdownEditor").then(
    (mod) => mod.MarkdownEditor,
  ),
);
const ColorConverter = dynamic(() =>
  import("@/components/tool/color-converter/ColorConverter").then(
    (mod) => mod.ColorConverter,
  ),
);
const JwtDecoder = dynamic(() =>
  import("@/components/tool/jwt-decoder/JwtDecoder").then(
    (mod) => mod.JwtDecoder,
  ),
);
const ImageCompressor = dynamic(() =>
  import("@/components/tool/image-compressor/ImageCompressor").then(
    (mod) => mod.ImageCompressor,
  ),
);
const UnitConverter = dynamic(() =>
  import("@/components/tool/unit-converter/UnitConverter").then(
    (mod) => mod.UnitConverter,
  ),
);

export const tools: ToolDefinition[] = [
  {
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
            output:
              '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}',
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
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 text.",
    category: "text",
    keywords: ["base64 encode", "base64 decode", "base64 tool"],
    component: Base64Editor,
    relatedTools: ["url-encoder", "json-formatter"],
    icon: "arrow-right-left",
    popular: true,
    seo: {
      title: "Base64 Encoder & Decoder | ZeroLoginTools",
      description:
        "Instantly encode text to Base64 or decode Base64 to text. Fast, secure, and entirely client-side.",
      keywords: ["encode base64", "decode base64", "base64 converter"],
    },
    contentBlocks: {
      intro: {
        title: "Base64 Encoder & Decoder",
        description:
          "Easily convert plain text into Base64 format, or decode Base64 back into readable text. Essential for web development and data transport.",
        keywords: ["Encode", "Decode", "Base64"],
      },
      instructions: {
        steps: [
          "Select whether you want to 'Encode' or 'Decode' using the toggle buttons.",
          "Paste your text into the input field.",
          "The converted result will instantly appear in the output box.",
          "Click 'Copy' to copy the result to your clipboard.",
        ],
      },
      examples: {
        examples: [
          {
            label: "Encoding Example",
            input: "Hello World",
            output: "SGVsbG8gV29ybGQ=",
          },
        ],
      },
      benefits: {
        benefits: [
          {
            title: "Bi-directional",
            description:
              "Seamlessly switch between encoding and decoding operations.",
          },
          {
            title: "Privacy First",
            description: "All conversion is handled safely in the browser.",
          },
        ],
      },
      features: {
        features: [
          "Auto-conversion on type",
          "Handles standard text arrays",
          "Fast clipboard access",
        ],
      },
    },
  },
  {
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Safely encode or decode URLs.",
    category: "text",
    keywords: ["url encode", "urldecode"],
    component: UrlEditor,
    relatedTools: ["base64-encoder"],
    icon: "link",
    seo: {
      title: "URL Encoder & Decoder | ZeroLoginTools",
      description:
        "Safely encode or decode URLs to ensure safe transmission over the internet.",
      keywords: ["url encode", "url decode"],
    },
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDv4 values in bulk.",
    category: "crypto-gen",
    keywords: ["uuid generator", "uuid v4"],
    component: UuidGenerator,
    relatedTools: ["password-generator"],
    icon: "hash",
    seo: {
      title: "UUID v4 Generator | ZeroLoginTools",
      description: "Generate secure, random UUIDv4 values quickly and in bulk.",
      keywords: ["uuid gen", "uuidv4 generator"],
    },
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Create strong customized passwords.",
    category: "crypto-gen",
    keywords: ["password generator", "secure passwords"],
    component: PasswordGenerator,
    relatedTools: ["uuid-generator"],
    icon: "key",
    popular: true,
    seo: {
      title: "Secure Password Generator | ZeroLoginTools",
      description:
        "Create highly secure, randomized passwords locally in your browser.",
      keywords: [
        "generate password",
        "secure password",
        "random string generator",
      ],
    },
  },
  {
    slug: "markdown-html",
    name: "Markdown to HTML",
    description: "Convert Markdown to valid HTML instantly.",
    category: "formatting",
    keywords: ["markdown to html", "markdown editor"],
    component: MarkdownEditor,
    relatedTools: ["json-formatter"],
    icon: "code",
    seo: {
      title: "Markdown to HTML Converter | ZeroLoginTools",
      description:
        "Write markdown and instantly preview and grab the HTML equivalent.",
      keywords: ["markdown html", "convert markdown"],
    },
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert between RGB, HEX, and HSL values.",
    category: "converters",
    keywords: ["color converter", "hex to rgb"],
    component: ColorConverter,
    relatedTools: ["unit-converter"],
    icon: "palette",
    seo: {
      title: "Color Format Converter | ZeroLoginTools",
      description:
        "Easily convert color values between HEX, RGB, and HSL spaces.",
      keywords: ["hex rgb", "color translation"],
    },
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens securely.",
    category: "developer",
    keywords: ["jwt decode", "json web token"],
    component: JwtDecoder,
    relatedTools: ["base64-encoder", "json-formatter"],
    icon: "shield",
    seo: {
      title: "JWT Decoder | ZeroLoginTools",
      description:
        "Decode and inspect JSON Web Tokens securely without sending them to a server.",
      keywords: ["decode jwt", "jwt parser", "json web token decoder"],
    },
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images directly in your browser.",
    category: "image",
    keywords: ["compress image", "image optimizer"],
    component: ImageCompressor,
    relatedTools: ["base64-encoder"],
    icon: "image",
    new: true,
    seo: {
      title: "Free Image Compressor | ZeroLoginTools",
      description:
        "Optimize and compress your images directly in your browser without quality loss.",
      keywords: ["image compression", "reduce image size"],
    },
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight, and temperature metrics.",
    category: "converters",
    keywords: ["unit converter", "measurements"],
    component: UnitConverter,
    relatedTools: ["color-converter"],
    icon: "scale",
    seo: {
      title: "Unit Converter | ZeroLoginTools",
      description:
        "Quickly convert between different units of length, weight, and temperature.",
      keywords: ["metric to imperial", "convert units"],
    },
  },
];
