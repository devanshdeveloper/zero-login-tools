export type CsvTable = string[][];

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

export function parseCsv(input: string): CsvTable {
  const text = (input ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (!text.trim()) return [[""]];
  const lines = text.split("\n");
  return lines.map((l) => splitCsvLine(l));
}

function escapeCsvCell(cell: string): string {
  const c = cell ?? "";
  const needsQuotes = /[",\n]/.test(c);
  const escaped = c.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

export function stringifyCsv(table: CsvTable): string {
  return table.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

export function normalizeTable(table: CsvTable): CsvTable {
  const rows = table.length;
  const cols = Math.max(1, ...table.map((r) => r.length));
  const out: CsvTable = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => table[r]?.[c] ?? ""),
  );
  return out.length ? out : [[""]];
}
