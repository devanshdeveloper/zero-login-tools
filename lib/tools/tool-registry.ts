import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { FAQItem } from "@/components/content/FAQ";
import { Example } from "@/components/content/ToolExamples";
import { Benefit } from "@/components/content/ToolBenefits";
import { ChangelogItem } from "@/components/content/ToolChangelog";

export type ToolCategory =
  | "formatting"
  | "text"
  | "cryptography"
  | "crypto-gen"
  | "converters"
  | "web-dev"
  | "media"
  | "developer"
  | "security"
  | "image"
  | "documents"
  | "utilities"
  | "playground";

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
const RegexVisualizer = dynamic(() =>
  import("@/components/tool/regex-visualizer/RegexVisualizer").then(
    (mod) => mod.RegexVisualizer,
  ),
);
const HtmlMinifier = dynamic(() =>
  import("@/components/tool/html-minifier/HtmlMinifier").then(
    (mod) => mod.HtmlMinifier,
  ),
);
const CssMinifier = dynamic(() =>
  import("@/components/tool/css-minifier/CssMinifier").then(
    (mod) => mod.CssMinifier,
  ),
);
const JsMinifier = dynamic(() =>
  import("@/components/tool/js-minifier/JsMinifier").then(
    (mod) => mod.JsMinifier,
  ),
);
const DiffChecker = dynamic(() =>
  import("@/components/tool/diff-checker/DiffChecker").then(
    (mod) => mod.DiffChecker,
  ),
);
const TextDiffViewer = dynamic(() =>
  import("@/components/tool/text-diff-viewer/TextDiffViewer").then(
    (mod) => mod.TextDiffViewer,
  ),
);
// Phase 2 — Text Processing
const TextCaseConverter = dynamic(() =>
  import("@/components/tool/text-case-converter/TextCaseConverter").then(
    (mod) => mod.TextCaseConverter,
  ),
);
const WordCounter = dynamic(() =>
  import("@/components/tool/word-counter/WordCounter").then(
    (mod) => mod.WordCounter,
  ),
);
const SpecialCharacterPicker = dynamic(() =>
  import("@/components/tool/special-character-picker/SpecialCharacterPicker").then(
    (mod) => mod.SpecialCharacterPicker,
  ),
);
const EmojiGenerator = dynamic(() =>
  import("@/components/tool/emoji-generator/EmojiGenerator").then(
    (mod) => mod.EmojiGenerator,
  ),
);
const AnnoyingTextGenerator = dynamic(() =>
  import("@/components/tool/annoying-text-generator/AnnoyingTextGenerator").then(
    (mod) => mod.AnnoyingTextGenerator,
  ),
);
const MarkdownPreview = dynamic(() =>
  import("@/components/tool/markdown-preview/MarkdownPreview").then(
    (mod) => mod.MarkdownPreview,
  ),
);
const HtmlToMarkdown = dynamic(() =>
  import("@/components/tool/html-to-markdown/HtmlToMarkdown").then(
    (mod) => mod.HtmlToMarkdown,
  ),
);
const TextSorter = dynamic(() =>
  import("@/components/tool/text-sorter/TextSorter").then(
    (mod) => mod.TextSorter,
  ),
);
const DuplicateLineRemover = dynamic(() =>
  import("@/components/tool/duplicate-line-remover/DuplicateLineRemover").then(
    (mod) => mod.DuplicateLineRemover,
  ),
);
const RandomTextGenerator = dynamic(() =>
  import("@/components/tool/random-text-generator/RandomTextGenerator").then(
    (mod) => mod.RandomTextGenerator,
  ),
);
const WordCloudGenerator = dynamic(() =>
  import("@/components/tool/word-cloud-generator/WordCloudGenerator").then(
    (mod) => mod.WordCloudGenerator,
  ),
);
// Phase 3 — Image Tools
const ImageResizer = dynamic(() =>
  import("@/components/tool/image-resizer/ImageResizer").then(
    (mod) => mod.ImageResizer,
  ),
);
const ImageCropper = dynamic(() =>
  import("@/components/tool/image-cropper/ImageCropper").then(
    (mod) => mod.ImageCropper,
  ),
);
const ImageRotator = dynamic(() =>
  import("@/components/tool/image-rotator/ImageRotator").then(
    (mod) => mod.ImageRotator,
  ),
);
const ImageMetadataViewer = dynamic(() =>
  import("@/components/tool/image-metadata-viewer/ImageMetadataViewer").then(
    (mod) => mod.ImageMetadataViewer,
  ),
);
const ColorPicker = dynamic(() =>
  import("@/components/tool/color-picker/ColorPicker").then(
    (mod) => mod.ColorPicker,
  ),
);
const PaletteGenerator = dynamic(() =>
  import("@/components/tool/palette-generator/PaletteGenerator").then(
    (mod) => mod.PaletteGenerator,
  ),
);
const FaviconGenerator = dynamic(() =>
  import("@/components/tool/favicon-generator/FaviconGenerator").then(
    (mod) => mod.FaviconGenerator,
  ),
);
const BackgroundRemover = dynamic(() =>
  import("@/components/tool/background-remover/BackgroundRemover").then(
    (mod) => mod.BackgroundRemover,
  ),
);
const ImageFormatConverter = dynamic(() =>
  import("@/components/tool/image-format-converter/ImageFormatConverter").then(
    (mod) => mod.ImageFormatConverter,
  ),
);
const GifResizer = dynamic(() =>
  import("@/components/tool/gif-resizer/GifResizer").then(
    (mod) => mod.GifResizer,
  ),
);

// Phase 4 — Document Tools
const PdfSplit = dynamic(() =>
  import("@/components/tool/pdf-split/PdfSplit").then((mod) => mod.PdfSplit),
);
const PdfMerge = dynamic(() =>
  import("@/components/tool/pdf-merge/PdfMerge").then((mod) => mod.PdfMerge),
);
const PdfCompress = dynamic(() =>
  import("@/components/tool/pdf-compress/PdfCompress").then(
    (mod) => mod.PdfCompress,
  ),
);
const PdfToImage = dynamic(() =>
  import("@/components/tool/pdf-to-image/PdfToImage").then(
    (mod) => mod.PdfToImage,
  ),
);
const ImageToPdf = dynamic(() =>
  import("@/components/tool/image-to-pdf/ImageToPdf").then(
    (mod) => mod.ImageToPdf,
  ),
);
const MarkdownToPdf = dynamic(() =>
  import("@/components/tool/markdown-to-pdf/MarkdownToPdf").then(
    (mod) => mod.MarkdownToPdf,
  ),
);
const HtmlToPdf = dynamic(() =>
  import("@/components/tool/html-to-pdf/HtmlToPdf").then((mod) => mod.HtmlToPdf),
);
const LatexPreview = dynamic(() =>
  import("@/components/tool/latex-preview/LatexPreview").then(
    (mod) => mod.LatexPreview,
  ),
);
const SimpleTextEditor = dynamic(() =>
  import("@/components/tool/simple-text-editor/SimpleTextEditor").then(
    (mod) => mod.SimpleTextEditor,
  ),
);
const SpreadsheetEditor = dynamic(() =>
  import("@/components/tool/spreadsheet-editor/SpreadsheetEditor").then(
    (mod) => mod.SpreadsheetEditor,
  ),
);
const CollaborativeNotepad = dynamic(() =>
  import("@/components/tool/collaborative-notepad/CollaborativeNotepad").then(
    (mod) => mod.CollaborativeNotepad,
  ),
);

// Phase 5 — Developer Playground Tools
const CodePlayground = dynamic(() =>
  import("@/components/tool/code-playground/CodePlayground").then(
    (mod) => mod.CodePlayground,
  ),
);
const JsConsoleRunner = dynamic(() =>
  import("@/components/tool/js-console-runner/JsConsoleRunner").then(
    (mod) => mod.JsConsoleRunner,
  ),
);
const PythonVisualizer = dynamic(() =>
  import("@/components/tool/python-visualizer/PythonVisualizer").then(
    (mod) => mod.PythonVisualizer,
  ),
);
const RegexTester = dynamic(() =>
  import("@/components/tool/regex-tester/RegexTester").then(
    (mod) => mod.RegexTester,
  ),
);
const SqlFormatter = dynamic(() =>
  import("@/components/tool/sql-formatter/SqlFormatter").then(
    (mod) => mod.SqlFormatter,
  ),
);
const SqlVisualizer = dynamic(() =>
  import("@/components/tool/sql-visualizer/SqlVisualizer").then(
    (mod) => mod.SqlVisualizer,
  ),
);
const JsonApiTester = dynamic(() =>
  import("@/components/tool/json-api-tester/JsonApiTester").then(
    (mod) => mod.JsonApiTester,
  ),
);
const HtmlPlayground = dynamic(() =>
  import("@/components/tool/html-playground/HtmlPlayground").then(
    (mod) => mod.HtmlPlayground,
  ),
);
const CssPlayground = dynamic(() =>
  import("@/components/tool/css-playground/CssPlayground").then(
    (mod) => mod.CssPlayground,
  ),
);
const ColorGradientGenerator = dynamic(() =>
  import("@/components/tool/color-gradient-generator/ColorGradientGenerator").then(
    (mod) => mod.ColorGradientGenerator,
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
  {
    slug: "regex-visualizer",
    name: "Regex Visualizer",
    description: "Test and visualize regular expressions with real-time matching.",
    category: "developer",
    keywords: ["regex tester", "regex visualizer", "regex matcher"],
    component: RegexVisualizer,
    relatedTools: ["json-formatter", "jwt-decoder"],
    icon: "search",
    popular: true,
    seo: {
      title: "Regex Visualizer & Tester | ZeroLoginTools",
      description:
        "Test and visualize regular expressions in real-time. See matches, groups, and flags instantly.",
      keywords: ["regex tester", "regex visualizer", "regular expression tester"],
    },
    contentBlocks: {
      intro: {
        title: "Regex Visualizer & Tester",
        description:
          "Test your regular expressions against sample text and see matches highlighted in real-time. Perfect for debugging and learning regex patterns.",
        keywords: ["Test Regex", "Visualize Matches", "Debug Patterns"],
      },
      instructions: {
        steps: [
          "Enter your regular expression pattern in the input field.",
          "Select flags (g for global, i for case-insensitive, etc.).",
          "Type or paste your test string in the text area.",
          "Click 'Test' to see all matches highlighted with groups and indices.",
        ],
      },
      examples: {
        examples: [
          {
            label: "Email Pattern",
            input: "test@example.com",
            output: "Match 1: 'test@example.com' at index 0",
          },
        ],
      },
      faq: {
        faqs: [
          {
            question: "What regex flags are supported?",
            answer:
              "All standard JavaScript regex flags: g (global), i (case-insensitive), m (multiline), s (dotall), u (unicode), and y (sticky).",
          },
          {
            question: "Can I test complex regex patterns?",
            answer:
              "Yes, the tool supports all JavaScript regex features including lookaheads, groups, and quantifiers.",
          },
        ],
      },
    },
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier",
    description: "Minify HTML code to reduce file size and improve load times.",
    category: "web-dev",
    keywords: ["html minifier", "minify html", "compress html"],
    component: HtmlMinifier,
    relatedTools: ["css-minifier", "js-minifier"],
    icon: "code",
    seo: {
      title: "HTML Minifier – Compress HTML Online | ZeroLoginTools",
      description:
        "Minify and compress your HTML code instantly. Reduce file size without losing functionality.",
      keywords: ["html minifier", "minify html", "compress html"],
    },
    contentBlocks: {
      intro: {
        title: "HTML Minifier",
        description:
          "Reduce your HTML file size by removing unnecessary whitespace, comments, and formatting. All processing happens in your browser.",
        keywords: ["Minify HTML", "Compress HTML", "Optimize HTML"],
      },
      instructions: {
        steps: [
          "Paste your HTML code into the input area.",
          "Click 'Minify HTML' to process the code.",
          "View compression statistics and copy the minified output.",
        ],
      },
      benefits: {
        benefits: [
          {
            title: "Faster Load Times",
            description: "Smaller files mean faster page loads for your users.",
          },
          {
            title: "Bandwidth Savings",
            description: "Reduce data transfer costs with smaller HTML files.",
          },
        ],
      },
    },
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    description: "Minify CSS code to reduce file size and improve performance.",
    category: "web-dev",
    keywords: ["css minifier", "minify css", "compress css"],
    component: CssMinifier,
    relatedTools: ["html-minifier", "js-minifier"],
    icon: "palette",
    seo: {
      title: "CSS Minifier – Compress CSS Online | ZeroLoginTools",
      description:
        "Minify and compress your CSS code instantly. Reduce file size and improve website performance.",
      keywords: ["css minifier", "minify css", "compress css"],
    },
    contentBlocks: {
      intro: {
        title: "CSS Minifier",
        description:
          "Optimize your CSS files by removing whitespace, comments, and unnecessary characters. All processing happens client-side.",
        keywords: ["Minify CSS", "Compress CSS", "Optimize CSS"],
      },
      instructions: {
        steps: [
          "Paste your CSS code into the input area.",
          "Click 'Minify CSS' to process the stylesheet.",
          "View compression statistics and copy the optimized output.",
        ],
      },
      benefits: {
        benefits: [
          {
            title: "Performance Boost",
            description: "Smaller CSS files load faster and improve page speed.",
          },
          {
            title: "Production Ready",
            description: "Get minified CSS perfect for production deployments.",
          },
        ],
      },
    },
  },
  {
    slug: "js-minifier",
    name: "JavaScript Minifier",
    description: "Minify JavaScript code to reduce file size and improve load times.",
    category: "web-dev",
    keywords: ["js minifier", "minify javascript", "compress js"],
    component: JsMinifier,
    relatedTools: ["html-minifier", "css-minifier"],
    icon: "code",
    seo: {
      title: "JavaScript Minifier – Compress JS Online | ZeroLoginTools",
      description:
        "Minify and compress your JavaScript code instantly. Reduce file size without changing functionality.",
      keywords: ["js minifier", "minify javascript", "compress js"],
    },
    contentBlocks: {
      intro: {
        title: "JavaScript Minifier",
        description:
          "Optimize your JavaScript files by removing comments, whitespace, and unnecessary characters. Perfect for production builds.",
        keywords: ["Minify JS", "Compress JavaScript", "Optimize JS"],
      },
      instructions: {
        steps: [
          "Paste your JavaScript code into the input area.",
          "Click 'Minify JavaScript' to process the code.",
          "View compression statistics and copy the minified output.",
        ],
      },
      benefits: {
        benefits: [
          {
            title: "Faster Execution",
            description: "Smaller files parse and execute faster in browsers.",
          },
          {
            title: "Better Performance",
            description: "Reduce bandwidth usage and improve user experience.",
          },
        ],
      },
    },
  },
  {
    slug: "diff-checker",
    name: "Diff Checker",
    description: "Compare two text files or code snippets and see the differences.",
    category: "developer",
    keywords: ["diff checker", "text diff", "code comparison"],
    component: DiffChecker,
    relatedTools: ["text-diff-viewer", "json-formatter"],
    icon: "git-compare",
    seo: {
      title: "Diff Checker – Compare Text & Code Online | ZeroLoginTools",
      description:
        "Compare two versions of text or code and see line-by-line differences. Perfect for code reviews and version control.",
      keywords: ["diff checker", "text diff", "code comparison"],
    },
    contentBlocks: {
      intro: {
        title: "Diff Checker",
        description:
          "Compare two versions of text or code side-by-side. See exactly what changed with color-coded additions, deletions, and modifications.",
        keywords: ["Compare Text", "Code Diff", "Version Comparison"],
      },
      instructions: {
        steps: [
          "Paste the original version in the left panel.",
          "Paste the new version in the right panel.",
          "Click 'Compare' to see the differences highlighted.",
          "Review statistics and copy the diff output if needed.",
        ],
      },
      benefits: {
        benefits: [
          {
            title: "Code Reviews",
            description: "Quickly identify changes in code reviews and pull requests.",
          },
          {
            title: "Version Tracking",
            description: "See exactly what changed between document versions.",
          },
        ],
      },
    },
  },
  {
    slug: "text-diff-viewer",
    name: "Text Difference Viewer",
    description: "View detailed differences between two text documents with side-by-side and unified views.",
    category: "text",
    keywords: ["text diff", "document comparison", "text difference"],
    component: TextDiffViewer,
    relatedTools: ["diff-checker", "json-formatter"],
    icon: "file-text",
    seo: {
      title: "Text Difference Viewer – Compare Documents Online | ZeroLoginTools",
      description:
        "Compare two text documents with detailed line and character-level differences. View changes side-by-side or in unified format.",
      keywords: ["text diff", "document comparison", "text difference viewer"],
    },
    contentBlocks: {
      intro: {
        title: "Text Difference Viewer",
        description:
          "Compare two text documents with comprehensive statistics. View differences in side-by-side or unified format with detailed change tracking.",
        keywords: ["Compare Documents", "Text Diff", "Change Tracking"],
      },
      instructions: {
        steps: [
          "Paste the first text in the left panel.",
          "Paste the second text in the right panel.",
          "Click 'Compare Texts' to analyze differences.",
          "Switch between side-by-side and unified views to see changes.",
        ],
      },
      benefits: {
        benefits: [
          {
            title: "Detailed Analysis",
            description: "See both line-level and character-level change statistics.",
          },
          {
            title: "Multiple Views",
            description: "Choose between side-by-side or unified diff views.",
          },
        ],
      },
    },
  },
  // ——— Phase 2: Text Processing ———
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between uppercase, lowercase, title case, camelCase, snake_case, and more.",
    category: "text",
    keywords: ["text case converter", "uppercase", "lowercase", "title case", "camelCase"],
    component: TextCaseConverter,
    relatedTools: ["word-counter", "text-sorter"],
    icon: "type",
    seo: {
      title: "Text Case Converter – Uppercase, Lowercase, Title Case | ZeroLoginTools",
      description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case instantly.",
      keywords: ["text case converter", "change case", "capitalize"],
    },
  },
  {
    slug: "word-counter",
    name: "Word & Character Counter",
    description: "Count words, characters, lines, paragraphs, and sentences in real time.",
    category: "text",
    keywords: ["word counter", "character counter", "count words"],
    component: WordCounter,
    relatedTools: ["text-case-converter", "duplicate-line-remover"],
    icon: "file-text",
    seo: {
      title: "Word Counter & Character Counter | ZeroLoginTools",
      description: "Count words, characters, lines, paragraphs, and sentences in your text instantly. No sign-up required.",
      keywords: ["word counter", "character counter", "count words online"],
    },
  },
  {
    slug: "special-character-picker",
    name: "Special Character Picker",
    description: "Copy currency symbols, math symbols, arrows, and special characters to clipboard.",
    category: "text",
    keywords: ["special characters", "unicode symbols", "copy symbols"],
    component: SpecialCharacterPicker,
    relatedTools: ["emoji-generator", "text-case-converter"],
    icon: "symbol",
    seo: {
      title: "Special Character Picker – Unicode Symbols | ZeroLoginTools",
      description: "Browse and copy special characters, currency symbols, arrows, and Unicode symbols. One-click copy.",
      keywords: ["special characters", "unicode", "symbols picker"],
    },
  },
  {
    slug: "emoji-generator",
    name: "Emoji Generator",
    description: "Generate random emojis by category. Copy single or multiple emojis.",
    category: "text",
    keywords: ["emoji generator", "random emoji", "emoji picker"],
    component: EmojiGenerator,
    relatedTools: ["special-character-picker", "random-text-generator"],
    icon: "smile",
    seo: {
      title: "Random Emoji Generator | ZeroLoginTools",
      description: "Generate random emojis by category. Copy one or many emojis to clipboard. No login required.",
      keywords: ["emoji generator", "random emoji", "emoji picker"],
    },
  },
  {
    slug: "annoying-text-generator",
    name: "Annoying Text Generator",
    description: "Transform text into zalgo, alternating caps, upside down, spongebob, and more.",
    category: "text",
    keywords: ["zalgo text", "upside down text", "annoying text"],
    component: AnnoyingTextGenerator,
    relatedTools: ["text-case-converter", "emoji-generator"],
    icon: "sparkles",
    seo: {
      title: "Annoying Text Generator – Zalgo, Upside Down | ZeroLoginTools",
      description: "Create zalgo text, alternating caps, upside down text, spongebob case, and other fun text styles.",
      keywords: ["zalgo text", "upside down text", "annoying text generator"],
    },
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description: "Live preview of Markdown as you type. No conversion, just preview.",
    category: "formatting",
    keywords: ["markdown preview", "markdown editor", "live preview"],
    component: MarkdownPreview,
    relatedTools: ["markdown-html", "html-to-markdown"],
    icon: "eye",
    seo: {
      title: "Markdown Preview – Live Preview Online | ZeroLoginTools",
      description: "See a live preview of your Markdown as you type. No sign-up. All processing in your browser.",
      keywords: ["markdown preview", "markdown live preview", "markdown editor"],
    },
  },
  {
    slug: "html-to-markdown",
    name: "HTML to Markdown",
    description: "Convert HTML to Markdown. Paste HTML and get clean Markdown output.",
    category: "formatting",
    keywords: ["html to markdown", "convert html to markdown"],
    component: HtmlToMarkdown,
    relatedTools: ["markdown-html", "markdown-preview"],
    icon: "code",
    seo: {
      title: "HTML to Markdown Converter | ZeroLoginTools",
      description: "Convert HTML to Markdown instantly. Paste your HTML and get clean Markdown. Client-side only.",
      keywords: ["html to markdown", "convert html", "html converter"],
    },
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    description: "Sort lines alphabetically, by length, or randomize. One item per line.",
    category: "text",
    keywords: ["text sorter", "sort lines", "alphabetize"],
    component: TextSorter,
    relatedTools: ["duplicate-line-remover", "word-counter"],
    icon: "arrow-up-down",
    seo: {
      title: "Text Sorter – Sort Lines Online | ZeroLoginTools",
      description: "Sort lines A–Z, Z–A, by length, or randomize. Paste your list and sort instantly.",
      keywords: ["sort lines", "text sorter", "alphabetize list"],
    },
  },
  {
    slug: "duplicate-line-remover",
    name: "Duplicate Line Remover",
    description: "Remove duplicate lines from text. Keep first or last occurrence.",
    category: "text",
    keywords: ["remove duplicates", "dedupe lines", "unique lines"],
    component: DuplicateLineRemover,
    relatedTools: ["text-sorter", "word-counter"],
    icon: "list",
    seo: {
      title: "Duplicate Line Remover – Dedupe Text Online | ZeroLoginTools",
      description: "Remove duplicate lines from your text. Trim and case options. All processing in your browser.",
      keywords: ["remove duplicate lines", "dedupe text", "unique lines"],
    },
  },
  {
    slug: "random-text-generator",
    name: "Random Text Generator",
    description: "Generate Lorem Ipsum or random words and paragraphs for placeholders.",
    category: "text",
    keywords: ["lorem ipsum", "random text", "placeholder text"],
    component: RandomTextGenerator,
    relatedTools: ["word-counter", "emoji-generator"],
    icon: "quote",
    seo: {
      title: "Random Text & Lorem Ipsum Generator | ZeroLoginTools",
      description: "Generate Lorem Ipsum or random words and paragraphs. Set word count or paragraph count. No login.",
      keywords: ["lorem ipsum", "random text generator", "placeholder text"],
    },
  },
  {
    slug: "word-cloud-generator",
    name: "Word Cloud Generator",
    description: "Generate a word cloud from your text. Word frequency visualized by size.",
    category: "text",
    keywords: ["word cloud", "word cloud generator", "tag cloud"],
    component: WordCloudGenerator,
    relatedTools: ["word-counter", "text-sorter"],
    icon: "cloud",
    seo: {
      title: "Word Cloud Generator – Create Word Clouds Online | ZeroLoginTools",
      description: "Create a word cloud from your text. Words sized by frequency. Client-side, private.",
      keywords: ["word cloud", "word cloud generator", "tag cloud"],
    },
  },
  // ——— Phase 3: Image Tools ———
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images by width, height, or both. Keep aspect ratio or stretch.",
    category: "image",
    keywords: ["image resizer", "resize image", "scale image"],
    component: ImageResizer,
    relatedTools: ["image-compressor", "image-cropper", "gif-resizer"],
    icon: "maximize",
    seo: {
      title: "Image Resizer – Resize Images Online | ZeroLoginTools",
      description: "Resize images by width or height. Keep aspect ratio. All processing in your browser.",
      keywords: ["image resizer", "resize image", "scale image online"],
    },
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    description: "Crop images by specifying x, y, width, and height. Download cropped image.",
    category: "image",
    keywords: ["image cropper", "crop image", "crop photo"],
    component: ImageCropper,
    relatedTools: ["image-resizer", "image-compressor"],
    icon: "crop",
    seo: {
      title: "Image Cropper – Crop Images Online | ZeroLoginTools",
      description: "Crop images with custom dimensions. Enter x, y, width, height. Client-side only.",
      keywords: ["image cropper", "crop image", "crop photo online"],
    },
  },
  {
    slug: "image-rotator",
    name: "Image Rotator",
    description: "Rotate images by 90°, 180°, or 270°. Download rotated image.",
    category: "image",
    keywords: ["image rotator", "rotate image", "rotate photo"],
    component: ImageRotator,
    relatedTools: ["image-resizer", "image-cropper"],
    icon: "rotate-cw",
    seo: {
      title: "Image Rotator – Rotate Images Online | ZeroLoginTools",
      description: "Rotate images 90, 180, or 270 degrees. Download result. No upload to server.",
      keywords: ["rotate image", "image rotator", "rotate photo online"],
    },
  },
  {
    slug: "image-metadata-viewer",
    name: "Image Metadata Viewer",
    description: "View image dimensions, file size, type, and aspect ratio.",
    category: "image",
    keywords: ["image metadata", "image info", "dimensions"],
    component: ImageMetadataViewer,
    relatedTools: ["image-compressor", "image-resizer"],
    icon: "info",
    seo: {
      title: "Image Metadata Viewer – View Image Info Online | ZeroLoginTools",
      description: "View image dimensions, file size, MIME type, and aspect ratio. Client-side.",
      keywords: ["image metadata", "image dimensions", "image info"],
    },
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick a color and get HEX and RGB values. Copy to clipboard.",
    category: "converters",
    keywords: ["color picker", "hex color", "rgb color"],
    component: ColorPicker,
    relatedTools: ["color-converter", "palette-generator"],
    icon: "pipette",
    seo: {
      title: "Color Picker – HEX & RGB | ZeroLoginTools",
      description: "Pick a color and get HEX and RGB values. Copy with one click. No sign-up.",
      keywords: ["color picker", "hex color", "rgb color picker"],
    },
  },
  {
    slug: "palette-generator",
    name: "Palette Generator",
    description: "Upload an image and extract a color palette. Copy hex codes.",
    category: "image",
    keywords: ["palette generator", "extract colors", "color palette"],
    component: PaletteGenerator,
    relatedTools: ["color-picker", "color-converter", "image-compressor"],
    icon: "palette",
    seo: {
      title: "Palette Generator – Extract Colors from Image | ZeroLoginTools",
      description: "Upload an image and extract a color palette. Get HEX codes. All in your browser.",
      keywords: ["palette generator", "extract colors from image", "color palette"],
    },
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    description: "Generate 16×16, 32×32, and 48×48 favicons from an image.",
    category: "image",
    keywords: ["favicon generator", "favicon", "favicon.ico"],
    component: FaviconGenerator,
    relatedTools: ["image-resizer", "image-compressor"],
    icon: "image",
    seo: {
      title: "Favicon Generator – Create Favicons Online | ZeroLoginTools",
      description: "Generate 16×16, 32×32, and 48×48 PNG favicons from any image. No upload.",
      keywords: ["favicon generator", "create favicon", "favicon.ico"],
    },
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    description: "Remove a solid-color background (e.g. green screen) by color and tolerance.",
    category: "image",
    keywords: ["background remover", "remove background", "green screen"],
    component: BackgroundRemover,
    relatedTools: ["image-compressor", "image-format-converter"],
    icon: "eraser",
    seo: {
      title: "Background Remover – Remove Solid Color Background | ZeroLoginTools",
      description: "Remove a solid-color background from images. Pick color and tolerance. Output PNG with transparency.",
      keywords: ["background remover", "remove background", "green screen removal"],
    },
  },
  {
    slug: "image-format-converter",
    name: "Image Format Converter",
    description: "Convert images between PNG, JPEG, and WebP.",
    category: "image",
    keywords: ["image format converter", "png to jpg", "jpg to png"],
    component: ImageFormatConverter,
    relatedTools: ["image-compressor", "favicon-generator"],
    icon: "image",
    seo: {
      title: "Image Format Converter – PNG, JPEG, WebP | ZeroLoginTools",
      description: "Convert images between PNG, JPEG, and WebP. All processing in your browser.",
      keywords: ["image format converter", "png to jpg", "convert image format"],
    },
  },
  {
    slug: "gif-resizer",
    name: "GIF Resizer",
    description: "Resize GIF or any image by width. Aspect ratio preserved. Animated GIF: first frame only.",
    category: "image",
    keywords: ["gif resizer", "resize gif", "gif size"],
    component: GifResizer,
    relatedTools: ["image-resizer", "image-compressor"],
    icon: "image",
    seo: {
      title: "GIF Resizer – Resize GIF Online | ZeroLoginTools",
      description: "Resize GIF or images by width. Keeps aspect ratio. Client-side. Animated GIF: first frame.",
      keywords: ["gif resizer", "resize gif", "gif resize online"],
    },
  },
  // ——— Phase 4: Document Tools ———
  {
    slug: "pdf-split",
    name: "PDF Split",
    description: "Extract a page range or split a PDF into single-page files.",
    category: "documents",
    keywords: ["split pdf", "extract pdf pages", "pdf splitter"],
    component: PdfSplit,
    relatedTools: ["pdf-merge", "pdf-compress", "pdf-to-image"],
    icon: "scissors",
    seo: {
      title: "PDF Split – Extract Pages Online | ZeroLoginTools",
      description:
        "Split a PDF into single pages or extract a page range. Runs 100% in your browser. No login required.",
      keywords: ["pdf split", "extract pdf pages", "pdf splitter online"],
    },
    contentBlocks: {
      intro: {
        title: "Split PDF (Client-Side)",
        description:
          "Extract exactly the pages you need or split a PDF into single-page PDFs. All processing happens locally in your browser.",
        keywords: ["PDF split", "Extract pages", "Client-side PDF"],
      },
      instructions: {
        steps: [
          "Upload a PDF file.",
          "Choose “Extract page range” or “Split into single pages”.",
          "Run the action and download the result.",
        ],
      },
      howToUse: {
        content:
          "Use “Extract page range” to create one new PDF that contains only the pages you select. Use “Split into single pages” to generate one PDF per page. Downloads are created locally in your browser; nothing is uploaded.",
      },
      howItWorks: {
        content:
          "This tool reads your PDF in-memory and copies selected pages into new PDFs using a client-side PDF library. The generated PDFs are offered as downloads via a temporary browser blob URL.",
      },
      security: {
        title: "Privacy & Security",
        description:
          "Your PDF never leaves your device. Page extraction happens entirely in your browser.",
      },
      faq: {
        faqs: [
          {
            question: "Does splitting upload my PDF?",
            answer:
              "No. Splitting and extraction are performed locally in your browser.",
          },
          {
            question: "Can I extract non-contiguous pages?",
            answer:
              "This version supports page ranges and splitting into single pages. For custom page lists, split into single pages and download the pages you need.",
          },
        ],
      },
      features: {
        features: [
          "Extract page ranges",
          "Split into single-page PDFs",
          "No sign-up, no server upload",
        ],
      },
    },
  },
  {
    slug: "pdf-merge",
    name: "PDF Merge",
    description: "Combine multiple PDFs into a single merged PDF in your chosen order.",
    category: "documents",
    keywords: ["merge pdf", "combine pdf", "pdf joiner"],
    component: PdfMerge,
    relatedTools: ["pdf-split", "pdf-compress"],
    icon: "files",
    seo: {
      title: "PDF Merge – Combine PDFs Online | ZeroLoginTools",
      description:
        "Merge multiple PDF files into one. Reorder inputs and download the combined PDF. Fully client-side.",
      keywords: ["merge pdf", "combine pdf", "pdf joiner online"],
    },
    contentBlocks: {
      intro: {
        title: "Merge PDFs",
        description:
          "Combine multiple PDFs into a single file. Reorder inputs, merge instantly, and download the result — all in your browser.",
      },
      instructions: {
        steps: [
          "Upload two or more PDF files.",
          "Reorder the PDFs using the up/down arrows.",
          "Click “Merge PDFs” and download the merged file.",
        ],
      },
      howToUse: {
        content:
          "Upload your PDFs, arrange them in the correct order, then merge and download the combined PDF.",
      },
      howItWorks: {
        content:
          "The tool copies pages from each input PDF into a new PDF document entirely client-side, then generates a download.",
      },
      security: {
        description:
          "No file uploads. Your PDFs are processed locally in your browser memory.",
      },
      faq: {
        faqs: [
          {
            question: "Can I reorder PDFs before merging?",
            answer:
              "Yes — use the up/down buttons to change the merge order.",
          },
          {
            question: "Is there a file size limit?",
            answer:
              "Limits depend on your device and browser memory. Very large PDFs may be slow.",
          },
        ],
      },
      features: {
        features: ["Multi-file merge", "Reorder inputs", "Instant download"],
      },
    },
  },
  {
    slug: "pdf-compress",
    name: "PDF Compress",
    description: "Optimize a PDF by re-saving and optionally stripping metadata (client-side).",
    category: "documents",
    keywords: ["compress pdf", "optimize pdf", "reduce pdf size"],
    component: PdfCompress,
    relatedTools: ["pdf-merge", "pdf-split"],
    icon: "file-down",
    seo: {
      title: "PDF Compressor (Client-Side) | ZeroLoginTools",
      description:
        "Optimize PDFs locally by stripping metadata and re-saving with object streams. No uploads, no accounts.",
      keywords: ["pdf compress", "optimize pdf", "reduce pdf size"],
    },
    contentBlocks: {
      intro: {
        title: "PDF Optimizer & Lightweight Compressor",
        description:
          "Reduce PDF size when possible by re-saving and stripping metadata. Runs entirely in your browser for maximum privacy.",
      },
      instructions: {
        steps: [
          "Upload a PDF file.",
          "Choose optimization options (metadata stripping, object streams).",
          "Click “Optimize PDF” and download the output.",
        ],
      },
      howToUse: {
        content:
          "Upload your PDF, enable the options you want, then optimize and download the result.",
      },
      howItWorks: {
        content:
          "The tool rebuilds the PDF structure client-side and saves it with settings that can reduce file size for some PDFs.",
      },
      security: {
        description:
          "No uploads. Your PDF stays on your device and is processed locally.",
      },
      limitations: {
        limitations: [
          "True compression (image downsampling) is limited in fully client-side tools.",
          "Some PDFs may not get smaller depending on how they were produced.",
        ],
      },
      faq: {
        faqs: [
          {
            question: "Will it always reduce file size?",
            answer:
              "Not always. Some PDFs are already optimized, or contain content that can’t be reduced without downsampling images.",
          },
          {
            question: "Does it remove text or pages?",
            answer:
              "No. Optimization preserves the document pages and content.",
          },
        ],
      },
      features: {
        features: ["Strip metadata", "Object stream saving", "Private client-side processing"],
      },
    },
  },
  {
    slug: "pdf-to-image",
    name: "PDF → Image",
    description: "Render a PDF page to a PNG image in your browser.",
    category: "documents",
    keywords: ["pdf to png", "pdf to image", "convert pdf page to image"],
    component: PdfToImage,
    relatedTools: ["image-to-pdf", "pdf-split", "image-resizer"],
    icon: "image",
    seo: {
      title: "PDF to PNG – Convert PDF Page to Image | ZeroLoginTools",
      description:
        "Convert a PDF page to a PNG image locally. Pick page number and scale, then download.",
      keywords: ["pdf to png", "pdf to image", "convert pdf page"],
    },
    contentBlocks: {
      intro: {
        title: "PDF to PNG (Client-Side)",
        description:
          "Render a PDF page as a PNG image. Choose the page and resolution scale and download instantly.",
      },
      instructions: {
        steps: [
          "Upload a PDF.",
          "Choose a page number and scale.",
          "Render the page and download the PNG.",
        ],
      },
      howToUse: {
        content:
          "Upload a PDF, choose which page to render, adjust scale for quality, then download the PNG.",
      },
      howItWorks: {
        content:
          "A client-side PDF renderer draws the selected page to a canvas, then exports it as a PNG blob for download.",
      },
      security: {
        description: "No uploads. Rendering happens locally in your browser.",
      },
      faq: {
        faqs: [
          {
            question: "Can I export all pages?",
            answer:
              "This version exports one page at a time to keep the UI fast and memory usage lower.",
          },
          {
            question: "Is it lossless?",
            answer:
              "PNG is lossless, but rendering is rasterized at the chosen scale.",
          },
        ],
      },
      features: {
        features: ["Page selector", "Scale control", "Download as PNG"],
      },
    },
  },
  {
    slug: "image-to-pdf",
    name: "Image → PDF",
    description: "Convert one or more images into a single PDF (one image per page).",
    category: "documents",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf"],
    component: ImageToPdf,
    relatedTools: ["pdf-to-image", "image-format-converter", "image-compressor"],
    icon: "file-image",
    seo: {
      title: "Image to PDF – JPG/PNG to PDF | ZeroLoginTools",
      description:
        "Convert images to a PDF directly in your browser. Add multiple images, reorder pages, and download.",
      keywords: ["image to pdf", "jpg to pdf", "png to pdf"],
    },
    contentBlocks: {
      intro: {
        title: "Convert Images to PDF",
        description:
          "Turn one or more images into a single PDF. Reorder images and download a ready-to-share document.",
      },
      instructions: {
        steps: [
          "Upload one or more images.",
          "Reorder images to set page order.",
          "Create the PDF and download it.",
        ],
      },
      howToUse: {
        content:
          "Upload images, reorder them, optionally adjust margins, then export to PDF and download.",
      },
      howItWorks: {
        content:
          "Each image is embedded into a PDF page client-side. One page is created per image.",
      },
      security: {
        description:
          "All conversion happens locally in your browser. Images are not uploaded.",
      },
      faq: {
        faqs: [
          {
            question: "Does it support multiple images?",
            answer:
              "Yes. Each image becomes its own page in the PDF in the order you set.",
          },
          {
            question: "What image formats are supported?",
            answer:
              "Common formats like PNG and JPEG are supported by most browsers.",
          },
        ],
      },
      features: {
        features: ["Multi-image PDF", "Reorder pages", "Adjust margins"],
      },
    },
  },
  {
    slug: "markdown-to-pdf",
    name: "Markdown → PDF",
    description: "Render Markdown to a PDF document and download it.",
    category: "documents",
    keywords: ["markdown to pdf", "md to pdf", "export markdown pdf"],
    component: MarkdownToPdf,
    relatedTools: ["markdown-html", "markdown-preview", "html-to-pdf"],
    icon: "file-text",
    seo: {
      title: "Markdown to PDF – Export MD as PDF | ZeroLoginTools",
      description:
        "Write Markdown, preview it, and export to PDF — entirely in your browser.",
      keywords: ["markdown to pdf", "md to pdf", "export markdown"],
    },
    contentBlocks: {
      intro: {
        title: "Markdown to PDF Export",
        description:
          "Turn Markdown into a shareable PDF. Preview your Markdown and export with one click.",
      },
      instructions: {
        steps: [
          "Write or paste Markdown.",
          "Confirm the preview looks right.",
          "Export and download the PDF.",
        ],
      },
      howToUse: {
        content:
          "Paste Markdown on the left, review the preview, then export to a PDF for sharing or printing.",
      },
      howItWorks: {
        content:
          "Markdown is rendered to HTML in your browser, then exported to PDF using client-side rendering.",
      },
      security: {
        description:
          "No uploads. Your Markdown stays on your device during export.",
      },
      faq: {
        faqs: [
          {
            question: "Will it include images?",
            answer:
              "Local or same-origin images usually work. Remote images can be blocked by CORS during PDF rendering.",
          },
          {
            question: "Does it support GitHub-flavored Markdown?",
            answer:
              "It supports common Markdown features. Complex extensions may render differently depending on the renderer.",
          },
        ],
      },
      features: {
        features: ["Live preview", "One-click PDF export", "Client-side processing"],
      },
    },
  },
  {
    slug: "html-to-pdf",
    name: "HTML → PDF",
    description: "Convert HTML into a downloadable PDF document (client-side).",
    category: "documents",
    keywords: ["html to pdf", "export html pdf", "convert html to pdf"],
    component: HtmlToPdf,
    relatedTools: ["markdown-to-pdf", "html-minifier"],
    icon: "file-code",
    seo: {
      title: "HTML to PDF – Convert HTML Online | ZeroLoginTools",
      description:
        "Paste HTML and export it as a PDF. Runs locally in your browser with no server processing.",
      keywords: ["html to pdf", "export html", "convert html to pdf online"],
    },
    contentBlocks: {
      intro: {
        title: "HTML to PDF Converter",
        description:
          "Convert HTML content to a PDF quickly for sharing or printing. Everything runs locally in your browser.",
      },
      instructions: {
        steps: ["Paste HTML", "Preview rendering", "Export to PDF and download"],
      },
      howToUse: {
        content:
          "Paste your HTML, verify the rendered preview, then export and download the PDF.",
      },
      howItWorks: {
        content:
          "The HTML is rendered in a local container and then exported to a PDF using client-side rendering.",
      },
      security: {
        description: "No uploads. Your HTML stays in your browser.",
      },
      faq: {
        faqs: [
          {
            question: "Will scripts run in the preview?",
            answer:
              "Scripts are not executed for export safety. This tool focuses on static HTML + CSS rendering.",
          },
          {
            question: "Why do some images not appear?",
            answer:
              "Remote images can be blocked by CORS. Prefer embedded data URLs or same-origin assets.",
          },
        ],
      },
      features: { features: ["Paste HTML", "Preview", "Export PDF"] },
    },
  },
  {
    slug: "latex-preview",
    name: "LaTeX Preview",
    description: "Preview LaTeX math expressions and copy the rendered HTML output.",
    category: "documents",
    keywords: ["latex preview", "katex", "latex renderer"],
    component: LatexPreview,
    relatedTools: ["markdown-preview", "markdown-to-pdf"],
    icon: "sigma",
    seo: {
      title: "LaTeX Preview – Render Math with KaTeX | ZeroLoginTools",
      description:
        "Render LaTeX math instantly in your browser. Preview output and copy KaTeX HTML.",
      keywords: ["latex preview", "katex", "render latex"],
    },
    contentBlocks: {
      intro: {
        title: "LaTeX Math Preview",
        description:
          "Preview LaTeX math expressions instantly using KaTeX. Great for docs, Markdown, and technical writing.",
      },
      instructions: {
        steps: [
          "Paste a LaTeX expression.",
          "Toggle display mode if needed.",
          "Copy the rendered HTML if you want to embed it elsewhere.",
        ],
      },
      howToUse: {
        content:
          "Paste your LaTeX expression and view the rendered result. If you need it, copy the HTML output for embedding.",
      },
      howItWorks: {
        content:
          "The tool uses KaTeX to parse LaTeX into HTML and CSS for fast client-side rendering.",
      },
      security: {
        description: "All rendering occurs locally in your browser.",
      },
      faq: {
        faqs: [
          {
            question: "Does this support full LaTeX documents?",
            answer:
              "This is focused on math expressions. Full LaTeX documents require a TeX engine.",
          },
          {
            question: "Why do I see an error but still get output?",
            answer:
              "When possible, KaTeX renders a best-effort preview even if some tokens are invalid.",
          },
        ],
      },
      features: { features: ["KaTeX rendering", "Display mode toggle", "Copy rendered HTML"] },
    },
  },
  {
    slug: "simple-text-editor",
    name: "Simple Text Editor",
    description: "A lightweight in-browser text editor with copy and download.",
    category: "documents",
    keywords: ["text editor", "notepad", "online text editor"],
    component: SimpleTextEditor,
    relatedTools: ["word-counter", "collaborative-notepad"],
    icon: "file-text",
    seo: {
      title: "Simple Text Editor – Browser Notepad | ZeroLoginTools",
      description:
        "Write, edit, copy, and download text instantly. No login. No storage. Fully client-side.",
      keywords: ["text editor", "online notepad", "write text online"],
    },
    contentBlocks: {
      intro: {
        title: "Simple Text Editor (No Login)",
        description:
          "A clean, fast text editor that runs in your browser. Copy to clipboard or download as a .txt file.",
      },
      instructions: {
        steps: [
          "Type or paste text into the editor.",
          "Use Copy to copy to clipboard.",
          "Use Download to save as a .txt file.",
        ],
      },
      howToUse: {
        content:
          "Type your text, then copy it or download it as a text file. Your content stays in-memory unless you download it.",
      },
      howItWorks: {
        content:
          "This is a client-side editor powered by your browser. No data is stored on a server.",
      },
      security: {
        description:
          "No automatic saving and no uploads. Your text stays on your device.",
      },
      faq: {
        faqs: [
          {
            question: "Is my text saved anywhere?",
            answer:
              "No. This editor does not persist data. If you refresh the page, your text may be lost unless you download it.",
          },
          {
            question: "Can I use this offline?",
            answer:
              "Often yes after the page is loaded once, depending on browser caching.",
          },
        ],
      },
      features: { features: ["Word/character stats", "Copy", "Download .txt"] },
    },
  },
  {
    slug: "spreadsheet-editor",
    name: "Spreadsheet Editor",
    description: "Edit CSV data in a lightweight spreadsheet-style table and export CSV.",
    category: "documents",
    keywords: ["csv editor", "spreadsheet editor", "edit csv online"],
    component: SpreadsheetEditor,
    relatedTools: ["simple-text-editor", "json-formatter"],
    icon: "table",
    seo: {
      title: "CSV Spreadsheet Editor – Edit CSV Online | ZeroLoginTools",
      description:
        "Paste CSV, edit cells in a simple grid, then export or copy CSV. Fully client-side.",
      keywords: ["csv editor", "spreadsheet", "edit csv"],
    },
    contentBlocks: {
      intro: {
        title: "CSV Spreadsheet Editor",
        description:
          "Edit CSV quickly with a simple grid UI. Copy the output or download as a .csv file.",
      },
      instructions: {
        steps: [
          "Paste CSV and load into the table.",
          "Edit any cell directly.",
          "Copy or download the updated CSV.",
        ],
      },
      howToUse: {
        content:
          "Load CSV into the table, edit values, then copy/download the output CSV.",
      },
      howItWorks: {
        content:
          "CSV text is parsed into a 2D array in your browser. Edits update the array and are re-serialized to CSV on demand.",
      },
      security: {
        description: "No uploads. CSV parsing and editing are local.",
      },
      faq: {
        faqs: [
          {
            question: "Does this support Excel .xlsx files?",
            answer:
              "No. This tool is CSV-based for speed and simplicity.",
          },
          {
            question: "Can I add rows and columns?",
            answer:
              "Yes — use the buttons to add rows or columns.",
          },
        ],
      },
      features: { features: ["CSV input/output", "Editable grid", "Download .csv"] },
    },
  },
  {
    slug: "collaborative-notepad",
    name: "Collaborative Notepad (Local Session)",
    description: "Create a shareable note link (URL fragment) for lightweight collaboration. No backend.",
    category: "documents",
    keywords: ["collaborative notepad", "share note", "no login notepad"],
    component: CollaborativeNotepad,
    relatedTools: ["simple-text-editor", "markdown-preview"],
    icon: "users",
    seo: {
      title: "Collaborative Notepad (No Backend) | ZeroLoginTools",
      description:
        "Create a share link that contains your note in the URL fragment. Share it to collaborate — no accounts or servers.",
      keywords: ["collaborative notepad", "share note", "no backend notepad"],
    },
    contentBlocks: {
      intro: {
        title: "Collaborative Notepad (Share via Link)",
        description:
          "A lightweight collaboration approach: generate a share link that includes your note content in the URL fragment. No server storage.",
      },
      instructions: {
        steps: [
          "Write your note.",
          "Click “Generate share link”.",
          "Copy and send the link to someone else.",
          "They open it and see the same note content.",
        ],
      },
      howToUse: {
        content:
          "Type your note, generate a share link, and send it. The note content is embedded in the link fragment.",
      },
      howItWorks: {
        content:
          "The tool Base64-encodes your note into the URL fragment (after #). The fragment is never sent to the server during HTTP requests.",
      },
      security: {
        description:
          "No uploads or server storage. Be careful: anyone with the link can read the note.",
      },
      faq: {
        faqs: [
          {
            question: "Is this real-time collaboration?",
            answer:
              "Not real-time. It’s link-based sharing. To sync changes, generate a new link and resend it.",
          },
          {
            question: "Is the note visible to the server?",
            answer:
              "The note is stored in the URL fragment, which browsers don’t send to servers in requests.",
          },
        ],
      },
      features: { features: ["Share via URL fragment", "Clipboard copy", "Local-only processing"] },
      limitations: {
        limitations: [
          "Large notes may exceed URL length limits in some browsers.",
          "Anyone with the link can read the note content.",
        ],
      },
    },
  },

  // ——— Phase 5: Playground Tools ———
  {
    slug: "code-playground",
    name: "Code Playground",
    description: "Edit HTML/CSS/JS together and preview in a sandboxed iframe.",
    category: "playground",
    keywords: ["code playground", "html css js playground", "sandbox"],
    component: CodePlayground,
    relatedTools: ["html-playground", "css-playground", "js-console-runner"],
    icon: "code",
    seo: {
      title: "Code Playground – HTML/CSS/JS Sandbox | ZeroLoginTools",
      description:
        "A client-side code playground for HTML, CSS, and JavaScript with live preview. No login required.",
      keywords: ["code playground", "html css js sandbox", "client-side playground"],
    },
    contentBlocks: {
      intro: {
        title: "HTML/CSS/JS Code Playground",
        description:
          "Prototype UI and scripts quickly with a simple in-browser sandbox. Live preview runs inside a sandboxed iframe.",
      },
      instructions: {
        steps: [
          "Edit HTML, CSS, and JavaScript.",
          "Watch the preview update.",
          "Open the preview in a new tab if needed.",
        ],
      },
      howToUse: {
        content:
          "Use the editors to modify HTML/CSS/JS and view output in the preview pane.",
      },
      howItWorks: {
        content:
          "Your code is injected into an iframe using srcDoc with a sandbox policy to keep execution isolated.",
      },
      security: {
        description:
          "Everything runs locally. The preview is isolated in a sandboxed iframe.",
      },
      faq: {
        faqs: [
          {
            question: "Is this like CodePen?",
            answer:
              "It’s a lightweight client-side sandbox for quick testing and prototyping.",
          },
          {
            question: "Can it access my local files?",
            answer:
              "No. The iframe sandbox prevents direct file access.",
          },
        ],
      },
      features: { features: ["Live preview", "Sandboxed iframe", "Open preview in new tab"] },
    },
  },
  {
    slug: "js-console-runner",
    name: "JS Console Runner",
    description: "Run JavaScript and capture console.log/info/warn/error output.",
    category: "playground",
    keywords: ["run javascript", "console runner", "js runner"],
    component: JsConsoleRunner,
    relatedTools: ["code-playground", "js-minifier"],
    icon: "terminal",
    seo: {
      title: "JavaScript Console Runner | ZeroLoginTools",
      description:
        "Run JavaScript in a sandboxed iframe and view console output. Private and client-side.",
      keywords: ["javascript runner", "console.log viewer", "run js online"],
    },
    contentBlocks: {
      intro: {
        title: "Run JavaScript + View Console Output",
        description:
          "Test small JavaScript snippets and see console output immediately. Runs locally inside a sandboxed iframe.",
      },
      instructions: {
        steps: ["Paste JavaScript", "Click Run", "Review console output"],
      },
      howToUse: {
        content:
          "Paste or write JavaScript, click Run, and inspect console output in the right panel.",
      },
      howItWorks: {
        content:
          "Your code executes inside a sandboxed iframe that forwards console messages to the parent page.",
      },
      security: {
        description:
          "Client-side only. Code runs in a sandboxed iframe for isolation.",
      },
      faq: {
        faqs: [
          {
            question: "Is this a full Node.js environment?",
            answer:
              "No. This runs in the browser’s JavaScript runtime with standard web APIs.",
          },
          {
            question: "Can this access my cookies or page DOM?",
            answer:
              "The runner is sandboxed and isolated from the main page’s DOM.",
          },
        ],
      },
      features: { features: ["console.log capture", "Sandboxed execution", "Clear output"] },
    },
  },
  {
    slug: "python-visualizer",
    name: "Python Visualizer",
    description: "Run Python locally in your browser (Pyodide) and view stdout + globals.",
    category: "playground",
    keywords: ["python runner", "pyodide", "python in browser"],
    component: PythonVisualizer,
    relatedTools: ["code-playground", "json-formatter"],
    icon: "terminal",
    seo: {
      title: "Python Visualizer – Run Python in Browser | ZeroLoginTools",
      description:
        "Execute Python client-side via Pyodide. View stdout and a best-effort globals snapshot. No backend.",
      keywords: ["python in browser", "pyodide", "python runner"],
    },
    contentBlocks: {
      intro: {
        title: "Python Visualizer (Client-Side)",
        description:
          "Run Python code directly in your browser using Pyodide. Great for quick experiments without installing anything.",
      },
      instructions: {
        steps: [
          "Click “Load Python runtime” (first time).",
          "Paste Python code.",
          "Click Run and view stdout.",
        ],
      },
      howToUse: {
        content:
          "Load the runtime once, then run Python snippets and inspect output and basic globals.",
      },
      howItWorks: {
        content:
          "Pyodide loads a WebAssembly-based Python runtime in the browser and executes your code locally.",
      },
      security: {
        description:
          "No server execution. Code runs in your browser. Loading the runtime requires a network request to a public CDN.",
      },
      faq: {
        faqs: [
          {
            question: "Is Python executed on a server?",
            answer:
              "No. Execution happens in your browser through Pyodide (WASM).",
          },
          {
            question: "Does it work offline?",
            answer:
              "After the runtime is loaded and cached it may work offline, but initial load requires internet.",
          },
        ],
      },
      features: { features: ["Client-side Python", "Stdout output", "Globals snapshot (best effort)"] },
      limitations: {
        limitations: [
          "Initial runtime download can be large.",
          "Only a subset of Python packages are available unless installed via Pyodide.",
        ],
      },
    },
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test JavaScript regex patterns, view matches/groups, and preview replacements.",
    category: "playground",
    keywords: ["regex tester", "regex replace", "regular expression tester"],
    component: RegexTester,
    relatedTools: ["regex-visualizer", "text-diff-viewer"],
    icon: "search",
    seo: {
      title: "Regex Tester – Matches + Replace Preview | ZeroLoginTools",
      description:
        "Test JavaScript regular expressions against text. See matches, capture groups, and replacement output.",
      keywords: ["regex tester", "regex replace", "javascript regex tester"],
    },
    contentBlocks: {
      intro: {
        title: "Regex Tester (JavaScript)",
        description:
          "Quickly debug regex patterns. See matches and capture groups and test a replacement string.",
      },
      instructions: {
        steps: [
          "Enter a regex pattern and flags.",
          "Paste test text.",
          "Review matches and replacement preview.",
        ],
      },
      howToUse: {
        content:
          "Use the pattern + flags inputs to define your regex. Matches update instantly as you edit text.",
      },
      howItWorks: {
        content:
          "The tool uses the browser’s JavaScript RegExp engine to execute matches and replacements locally.",
      },
      security: { description: "All processing is local in your browser." },
      faq: {
        faqs: [
          {
            question: "Which regex flavor is this?",
            answer:
              "JavaScript regular expressions (ECMAScript).",
          },
          {
            question: "Can a regex freeze the page?",
            answer:
              "Some patterns can be slow on large inputs. If the page becomes slow, reduce input size or simplify the pattern.",
          },
        ],
      },
      features: { features: ["Matches + groups", "Flag support", "Replace preview"] },
    },
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    description: "Format SQL queries for readability (Postgres/MySQL/SQLite/T-SQL).",
    category: "playground",
    keywords: ["sql formatter", "format sql", "pretty sql"],
    component: SqlFormatter,
    relatedTools: ["sql-visualizer", "json-formatter"],
    icon: "code",
    seo: {
      title: "SQL Formatter – Pretty Print SQL | ZeroLoginTools",
      description:
        "Format SQL queries instantly for readability. Client-side formatting with common dialect options.",
      keywords: ["sql formatter", "pretty print sql", "format sql online"],
    },
    contentBlocks: {
      intro: {
        title: "Format SQL Instantly",
        description:
          "Paste SQL and get a clean, readable formatted query. Choose a dialect that matches your SQL flavor.",
      },
      instructions: {
        steps: ["Paste SQL", "Choose dialect", "Copy formatted output"],
      },
      howToUse: {
        content:
          "Paste SQL into the input, select the dialect, and copy the formatted output.",
      },
      howItWorks: {
        content:
          "A client-side SQL formatter parses and reprints your query with consistent indentation and casing.",
      },
      security: { description: "No uploads. Formatting runs locally." },
      faq: {
        faqs: [
          {
            question: "Will it change query semantics?",
            answer:
              "Formatting should not change semantics, but always review output if you have complex vendor-specific syntax.",
          },
          {
            question: "Does it validate SQL?",
            answer:
              "It’s primarily a formatter; it may fail on invalid SQL, but it’s not a full database validator.",
          },
        ],
      },
      features: { features: ["Dialect selection", "Readable indentation", "Copy output"] },
    },
  },
  {
    slug: "sql-visualizer",
    name: "SQL Visualizer",
    description: "Parse SQL into an AST (JSON) for inspection and debugging.",
    category: "playground",
    keywords: ["sql ast", "sql parser", "sql visualizer"],
    component: SqlVisualizer,
    relatedTools: ["sql-formatter"],
    icon: "network",
    seo: {
      title: "SQL Visualizer – View SQL AST | ZeroLoginTools",
      description:
        "Visualize SQL by parsing it into an AST (JSON). Useful for debugging and learning how SQL parses.",
      keywords: ["sql visualizer", "sql ast", "sql parser online"],
    },
    contentBlocks: {
      intro: {
        title: "SQL to AST Visualizer",
        description:
          "See how a SQL statement parses by converting it into a JSON AST. Great for analysis and tooling experiments.",
      },
      instructions: {
        steps: ["Paste SQL", "View the AST output", "Copy as JSON"],
      },
      howToUse: {
        content:
          "Paste a SQL query and view the parsed AST. Copy the AST JSON if you need it for debugging.",
      },
      howItWorks: {
        content:
          "A client-side SQL parser generates an abstract syntax tree (AST) from your input and prints it as JSON.",
      },
      security: { description: "Local parsing only. No network calls for your SQL content." },
      faq: {
        faqs: [
          {
            question: "Why doesn’t my SQL parse?",
            answer:
              "Some vendor-specific syntax isn’t supported by the parser. Try simplifying or switching to a more standard form.",
          },
          {
            question: "Is the AST standardized?",
            answer:
              "AST shape depends on the parser library. It’s designed for programmatic analysis.",
          },
        ],
      },
      features: { features: ["AST output", "Copy JSON", "Client-side parsing"] },
    },
  },
  {
    slug: "json-api-tester",
    name: "JSON API Tester",
    description: "Send HTTP requests from your browser and inspect JSON responses.",
    category: "playground",
    keywords: ["api tester", "http client", "json api tester"],
    component: JsonApiTester,
    relatedTools: ["json-formatter", "jwt-decoder"],
    icon: "send",
    seo: {
      title: "JSON API Tester – Send Requests in Browser | ZeroLoginTools",
      description:
        "Test APIs by sending requests from your browser. Inspect status, headers, and response body. Client-side only.",
      keywords: ["api tester", "http request tester", "json api tester"],
    },
    contentBlocks: {
      intro: {
        title: "Test JSON APIs (Client-Side)",
        description:
          "Send GET/POST requests and inspect the response. Great for quick checks — with the usual browser CORS limitations.",
      },
      instructions: {
        steps: [
          "Choose an HTTP method and URL.",
          "Set headers and body if needed.",
          "Send the request and inspect the response.",
        ],
      },
      howToUse: {
        content:
          "Enter a URL, add headers/body, then send the request. If a request fails, it may be blocked by CORS.",
      },
      howItWorks: {
        content:
          "Requests are made using the browser fetch API. Responses are displayed as text or pretty-printed JSON when possible.",
      },
      security: {
        description:
          "Requests come from your browser. Be careful with API keys and tokens in shared environments.",
      },
      limitations: {
        limitations: [
          "CORS can block requests to many third-party APIs.",
          "This tool cannot bypass browser security policies.",
        ],
      },
      faq: {
        faqs: [
          {
            question: "Why do I get a CORS error?",
            answer:
              "Many APIs do not allow browser-origin requests. You may need to call the API from your own backend in those cases.",
          },
          {
            question: "Does this store my headers or tokens?",
            answer:
              "No. Inputs stay in-memory in your browser session.",
          },
        ],
      },
      features: { features: ["GET/POST/etc", "Headers + body", "Pretty JSON responses"] },
    },
  },
  {
    slug: "html-playground",
    name: "HTML Playground",
    description: "Edit HTML and preview it instantly in a sandboxed iframe.",
    category: "playground",
    keywords: ["html playground", "html preview", "html sandbox"],
    component: HtmlPlayground,
    relatedTools: ["code-playground", "html-minifier", "markdown-html"],
    icon: "code",
    seo: {
      title: "HTML Playground – Live Preview | ZeroLoginTools",
      description:
        "Write HTML and see the preview instantly. Client-side sandbox with no login required.",
      keywords: ["html playground", "html preview", "live html editor"],
    },
    contentBlocks: {
      intro: {
        title: "HTML Playground",
        description:
          "A simple live HTML editor and preview. Great for quick snippets and layout tests.",
      },
      instructions: { steps: ["Edit HTML", "See preview", "Open preview in new tab (optional)"] },
      howToUse: { content: "Edit the HTML and watch the preview update in the iframe." },
      howItWorks: { content: "Your HTML is loaded into a sandboxed iframe via srcDoc for isolation." },
      security: { description: "Local-only. Preview runs in a sandboxed iframe." },
      faq: {
        faqs: [
          { question: "Will scripts run?", answer: "Basic scripts may run inside the sandboxed iframe, but permissions are restricted." },
          { question: "Is it stored?", answer: "No. Refreshing may clear your content." },
        ],
      },
      features: { features: ["Live preview", "Sandboxed iframe", "Open preview"] },
    },
  },
  {
    slug: "css-playground",
    name: "CSS Playground",
    description: "Edit CSS (and optional HTML) and preview it live.",
    category: "playground",
    keywords: ["css playground", "css preview", "css sandbox"],
    component: CssPlayground,
    relatedTools: ["code-playground", "css-minifier"],
    icon: "palette",
    seo: {
      title: "CSS Playground – Live CSS Preview | ZeroLoginTools",
      description:
        "Edit CSS and see changes instantly. Includes an HTML snippet for preview. Client-side only.",
      keywords: ["css playground", "live css preview", "css editor"],
    },
    contentBlocks: {
      intro: {
        title: "CSS Playground",
        description:
          "Test CSS quickly with a live preview. Edit both CSS and the HTML preview snippet.",
      },
      instructions: { steps: ["Edit HTML snippet", "Edit CSS", "Review preview"] },
      howToUse: { content: "Adjust the HTML snippet and CSS, then view the preview in the iframe." },
      howItWorks: { content: "The HTML and CSS are injected into a sandboxed iframe using srcDoc." },
      security: { description: "Local-only. Preview is isolated in an iframe." },
      faq: {
        faqs: [
          { question: "Can I use external fonts?", answer: "You can, but remote assets may be blocked by CORS depending on source." },
          { question: "Does it support Tailwind?", answer: "Not automatically. This tool is for plain CSS." },
        ],
      },
      features: { features: ["Live CSS preview", "Editable HTML snippet", "Open preview"] },
    },
  },
  {
    slug: "color-gradient-generator",
    name: "Color Gradient Generator",
    description: "Generate a linear-gradient CSS string and color stops between two colors.",
    category: "playground",
    keywords: ["gradient generator", "linear gradient", "css gradient"],
    component: ColorGradientGenerator,
    relatedTools: ["color-picker", "color-converter", "palette-generator"],
    icon: "palette",
    seo: {
      title: "CSS Gradient Generator – Linear Gradient | ZeroLoginTools",
      description:
        "Generate linear-gradient CSS and a set of interpolated color stops between two HEX colors. Client-side.",
      keywords: ["css gradient generator", "linear gradient", "color stops"],
    },
    contentBlocks: {
      intro: {
        title: "Linear Gradient Generator",
        description:
          "Pick start/end colors, choose steps and angle, and copy a production-ready CSS linear-gradient string.",
      },
      instructions: {
        steps: [
          "Pick start and end colors.",
          "Set step count and angle.",
          "Copy the generated CSS or use the stop palette.",
        ],
      },
      howToUse: { content: "Pick colors and copy the CSS. Use the generated stops for design systems or charts." },
      howItWorks: { content: "The tool interpolates RGB values between two HEX colors and builds a CSS gradient string." },
      security: { description: "No uploads. Computation happens locally." },
      faq: {
        faqs: [
          { question: "Is interpolation perceptual?", answer: "This version interpolates in RGB space for simplicity. For perceptual gradients, consider HSL/LAB interpolation." },
          { question: "How many stops can I generate?", answer: "Up to 50 stops to keep the UI responsive." },
        ],
      },
      features: { features: ["CSS linear-gradient", "Stop palette", "Copy CSS"] },
    },
  },
];

/** Tool list without components, for search and listing. */
export const toolSummaries: ToolSummary[] = tools.map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- intentionally omit component
  ({ component, ...rest }) => rest,
);
