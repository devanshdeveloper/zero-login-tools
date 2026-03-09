export interface MinifyResult {
  success: boolean;
  minified: string;
  originalSize: number;
  minifiedSize: number;
  compressionRatio: number;
  error?: string;
}

export function minifyJs(js: string): MinifyResult {
  if (!js.trim()) {
    return {
      success: true,
      minified: "",
      originalSize: 0,
      minifiedSize: 0,
      compressionRatio: 0,
    };
  }

  try {
    const originalSize = new Blob([js]).size;
    let minified = js;

    // Remove single-line comments (but preserve URLs and regex)
    minified = minified.replace(/(?:^|\n|\r)(\s*)\/\/.*/g, "$1");

    // Remove multi-line comments (but preserve regex)
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove whitespace around operators and punctuation
    minified = minified.replace(/\s*([=+\-*/%<>!&|?:;,{}()[\]])/g, "$1");
    minified = minified.replace(/([=+\-*/%<>!&|?:;,{}()[\]\[\]])\s*/g, "$1");

    // Remove leading/trailing whitespace from lines
    minified = minified.replace(/^\s+|\s+$/gm, "");

    // Remove line breaks (but preserve in strings)
    // This is a simple approach - a full minifier would need a parser
    minified = minified.replace(/\n+/g, " ");

    // Remove multiple spaces
    minified = minified.replace(/\s+/g, " ");

    // Remove spaces around dots (object property access)
    minified = minified.replace(/\s*\.\s*/g, ".");

    // Remove spaces after keywords (but be careful with return, throw, etc.)
    const keywords = ["return", "throw", "break", "continue", "yield"];
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\s+`, "g");
      minified = minified.replace(regex, `${keyword} `);
    });

    // Remove trailing semicolons before closing braces
    minified = minified.replace(/;\s*}/g, "}");

    // Remove spaces after opening and before closing parentheses/brackets
    minified = minified.replace(/\(\s+/g, "(");
    minified = minified.replace(/\s+\)/g, ")");
    minified = minified.replace(/\[\s+/g, "[");
    minified = minified.replace(/\s+\]/g, "]");

    const minifiedSize = new Blob([minified]).size;
    const compressionRatio =
      originalSize > 0
        ? ((originalSize - minifiedSize) / originalSize) * 100
        : 0;

    return {
      success: true,
      minified: minified.trim(),
      originalSize,
      minifiedSize,
      compressionRatio: Math.round(compressionRatio * 100) / 100,
    };
  } catch (err: unknown) {
    return {
      success: false,
      minified: js,
      originalSize: new Blob([js]).size,
      minifiedSize: new Blob([js]).size,
      compressionRatio: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
