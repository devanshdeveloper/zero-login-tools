import { decodeBase64, encodeBase64 } from "@/lib/engines/base64Engine";

export function buildShareUrl(
  basePath: string,
  content: string,
  opts?: { maxChars?: number },
): { success: boolean; url?: string; error?: string } {
  const maxChars = opts?.maxChars ?? 50_000;
  if ((content ?? "").length > maxChars) {
    return {
      success: false,
      error: `Content is too large to share via URL (>${maxChars.toLocaleString()} chars).`,
    };
  }

  const payload = encodeBase64(content ?? "");
  if (!payload) return { success: false, error: "Failed to encode content." };

  const url = `${basePath}#data=${encodeURIComponent(payload)}`;
  return { success: true, url };
}

export function parseSharedContentFromHash(
  hash: string,
): { success: true; content: string } | { success: false; error: string } {
  const h = (hash ?? "").startsWith("#") ? (hash ?? "").slice(1) : hash ?? "";
  const params = new URLSearchParams(h);
  const data = params.get("data");
  if (!data) return { success: false, error: "No shared content found in URL." };

  const decoded = decodeBase64(decodeURIComponent(data));
  if (!decoded.success) return { success: false, error: "Invalid shared content." };
  return { success: true, content: decoded.value };
}

