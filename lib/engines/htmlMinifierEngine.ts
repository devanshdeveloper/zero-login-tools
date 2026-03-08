export interface MinifyResult {
  success: boolean;
  minified: string;
  originalSize: number;
  minifiedSize: number;
  compressionRatio: number;
  error?: string;
}

export function minifyHtml(html: string): MinifyResult {
  if (!html.trim()) {
    return {
      success: true,
      minified: "",
      originalSize: 0,
      minifiedSize: 0,
      compressionRatio: 0,
    };
  }

  try {
    const originalSize = new Blob([html]).size;
    let minified = html;

    // Remove HTML comments (but preserve conditional comments)
    minified = minified.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");

    // Remove whitespace between tags
    minified = minified.replace(/>\s+</g, "><");

    // Remove leading/trailing whitespace from lines
    minified = minified.replace(/^\s+|\s+$/gm, "");

    // Collapse multiple spaces to single space (but preserve in pre, textarea, etc.)
    const parts: string[] = [];
    let lastIndex = 0;
    const tagRegex = /<(pre|textarea|code|script|style)[^>]*>[\s\S]*?<\/\1>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
      // Add content before the preserved tag
      const before = html.slice(lastIndex, match.index);
      parts.push(before.replace(/\s+/g, " "));
      
      // Add preserved tag content as-is
      parts.push(match[0]);
      lastIndex = match.index + match[0].length;
    }

    // Add remaining content
    if (lastIndex < html.length) {
      parts.push(html.slice(lastIndex).replace(/\s+/g, " "));
    }

    if (parts.length > 0) {
      minified = parts.join("");
    } else {
      minified = minified.replace(/\s+/g, " ");
    }

    // Remove spaces around certain tags
    minified = minified.replace(/\s*<\/(p|div|span|h[1-6]|li|td|th)>/gi, "</$1>");
    minified = minified.replace(/<(p|div|span|h[1-6]|li|td|th)[^>]*>\s*/gi, "<$1>");

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
      minified: html,
      originalSize: new Blob([html]).size,
      minifiedSize: new Blob([html]).size,
      compressionRatio: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
