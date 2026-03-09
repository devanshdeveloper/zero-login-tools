import { executeEngine, EngineExecutionResult } from "@/registry/engines/core";
import { EngineContext } from "@/registry/types";

export interface JsonFormatResult {
  success: boolean;
  value: string;
  error?: string;
  lines?: number;
  size?: number;
}

export interface JsonOptions {
  action: "format" | "minify";
  space?: number;
}

export async function runJsonFormatter(
  context: EngineContext<string, JsonOptions>,
): Promise<EngineExecutionResult<string>> {
  return executeEngine(context, async (ctx) => {
    const { input, options } = ctx;
    if (options.action === "minify") {
      const res = minifyJson(input);
      if (!res.success) throw new Error(res.error || "Failed to minify JSON");
      return res.value;
    } else {
      const res = formatJson(input, options.space ?? 2);
      if (!res.success) throw new Error(res.error || "Failed to format JSON");
      return res.value;
    }
  });
}

export function formatJson(input: string, space: number = 2): JsonFormatResult {
  if (!input.trim()) return { success: true, value: "" };
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, space);
    return {
      success: true,
      value: formatted,
      lines: formatted.split("\n").length,
      size: new Blob([formatted]).size,
    };
  } catch (err: unknown) {
    return {
      success: false,
      value: input,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  return formatJson(input, 0);
}
