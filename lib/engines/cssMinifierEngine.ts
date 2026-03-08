export interface MinifyResult {
  success: boolean;
  minified: string;
  originalSize: number;
  minifiedSize: number;
  compressionRatio: number;
  error?: string;
}

export function minifyCss(css: string): MinifyResult {
  if (!css.trim()) {
    return {
      success: true,
      minified: "",
      originalSize: 0,
      minifiedSize: 0,
      compressionRatio: 0,
    };
  }

  try {
    const originalSize = new Blob([css]).size;
    let minified = css;

    // Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove whitespace around special characters
    minified = minified.replace(/\s*([{}:;,])\s*/g, "$1");

    // Remove leading/trailing whitespace
    minified = minified.replace(/^\s+|\s+$/gm, "");

    // Remove whitespace before semicolons and closing braces
    minified = minified.replace(/\s*;\s*/g, ";");
    minified = minified.replace(/\s*}\s*/g, "}");
    minified = minified.replace(/\s*{\s*/g, "{");

    // Remove line breaks
    minified = minified.replace(/\n/g, "");

    // Remove spaces around colons
    minified = minified.replace(/\s*:\s*/g, ":");

    // Remove multiple spaces
    minified = minified.replace(/\s+/g, " ");

    // Remove spaces before !important
    minified = minified.replace(/\s+!important/g, "!important");

    // Remove trailing semicolons before closing braces
    minified = minified.replace(/;}/g, "}");

    // Remove spaces in selectors (but preserve in content/attr values)
    minified = minified.replace(/\s*>\s*/g, ">");
    minified = minified.replace(/\s*\+\s*/g, "+");
    minified = minified.replace(/\s*~\s*/g, "~");

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
      minified: css,
      originalSize: new Blob([css]).size,
      minifiedSize: new Blob([css]).size,
      compressionRatio: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
