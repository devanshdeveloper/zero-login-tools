export interface JsonFormatResult {
  success: boolean;
  value: string;
  error?: string;
  lines?: number;
  size?: number;
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
  } catch (err: any) {
    return { success: false, value: input, error: err.message };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  return formatJson(input, 0);
}
