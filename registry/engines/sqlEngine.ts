import { format as formatSqlImpl } from "sql-formatter";
import { Parser } from "node-sql-parser";

export function formatSql(
  sql: string,
  opts?: { language?: "sql" | "postgresql" | "mysql" | "sqlite" | "tsql" },
): { success: true; value: string } | { success: false; value: string; error: string } {
  const input = sql ?? "";
  if (!input.trim()) return { success: true, value: "" };
  try {
    const value = formatSqlImpl(input, { language: (opts?.language as never) ?? "sql" });
    return { success: true, value };
  } catch (err: unknown) {
    return { success: false, value: input, error: err instanceof Error ? err.message : String(err) };
  }
}

export function parseSqlToAst(
  sql: string,
): { success: true; ast: unknown } | { success: false; error: string } {
  const input = sql ?? "";
  if (!input.trim()) return { success: true, ast: null };
  try {
    const parser = new Parser();
    const ast = parser.astify(input);
    return { success: true, ast };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

