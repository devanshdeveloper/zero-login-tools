export function parseHeaders(input: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = (input ?? "").split(/\r\n|\r|\n/).filter(Boolean);
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim();
    if (!k) continue;
    out[k] = v;
  }
  return out;
}

export function safePrettyJson(text: string): { ok: boolean; value: string } {
  const t = text ?? "";
  if (!t.trim()) return { ok: true, value: "" };
  try {
    return { ok: true, value: JSON.stringify(JSON.parse(t), null, 2) };
  } catch {
    return { ok: false, value: t };
  }
}

export async function readResponseBody(res: Response): Promise<{ text: string; isJson: boolean }> {
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  const isJson = ct.includes("application/json") || ct.includes("+json");
  return { text, isJson };
}

