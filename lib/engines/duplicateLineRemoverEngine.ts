export type DedupeMode = "remove" | "keep-first" | "keep-last" | "count";

export interface DedupeResult {
  output: string;
  removedCount: number;
  uniqueCount: number;
  totalCount: number;
}

function normalizeLine(line: string, trim: boolean, caseSensitive: boolean): string {
  let s = line;
  if (trim) s = s.trim();
  if (!caseSensitive) s = s.toLowerCase();
  return s;
}

export function removeDuplicateLines(
  text: string,
  options: { trim?: boolean; caseSensitive?: boolean; keepEmpty?: boolean } = {},
): DedupeResult {
  const { trim = true, caseSensitive = false, keepEmpty = false } = options;
  const lines = text.split(/\r?\n/);
  const totalCount = lines.length;
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const normalized = normalizeLine(line, trim, caseSensitive);
    const isEmpty = normalized === "";
    if (isEmpty && !keepEmpty) {
      continue;
    }
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(line);
  }

  return {
    output: result.join("\n"),
    removedCount: totalCount - result.length,
    uniqueCount: result.length,
    totalCount,
  };
}
