import katex from "katex";

export type LatexRenderResult =
  | { success: true; html: string }
  | { success: false; html: string; error: string };

export function renderLatexToHtml(
  input: string,
  opts?: { displayMode?: boolean },
): LatexRenderResult {
  const src = input ?? "";
  if (!src.trim()) return { success: true, html: "" };

  try {
    const html = katex.renderToString(src, {
      throwOnError: true,
      displayMode: opts?.displayMode ?? true,
      strict: "ignore",
    });
    return { success: true, html };
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    const html = katex.renderToString(src, {
      throwOnError: false,
      displayMode: opts?.displayMode ?? true,
      strict: "ignore",
    });
    return { success: false, html, error };
  }
}

