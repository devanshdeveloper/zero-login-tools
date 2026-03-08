export type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "toggle"
  | "camel"
  | "snake"
  | "kebab"
  | "constant";

function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function toSentenceCase(str: string): string {
  return str.replace(/(^\s*\w|\.\s*\w)/g, (m) => m.slice(-1).toUpperCase());
}

function toCamelCase(str: string): string {
  const words = str
    .trim()
    .split(/[\s\-_]+/)
    .filter(Boolean);
  return words
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join("");
}

function toSnakeCase(str: string): string {
  return str
    .trim()
    .replace(/([A-Z])/g, "_$1")
    .replace(/[\s\-]+/g, "_")
    .replace(/^_/, "")
    .toLowerCase();
}

function toKebabCase(str: string): string {
  return str
    .trim()
    .replace(/([A-Z])/g, "-$1")
    .replace(/[\s_]+/g, "-")
    .replace(/^-/, "")
    .toLowerCase();
}

function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

function toggleCase(str: string): string {
  return str
    .split("")
    .map((c) =>
      c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase(),
    )
    .join("");
}

export function convertCase(text: string, caseType: CaseType): string {
  if (!text) return "";
  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text.toLowerCase());
    case "sentence":
      return toSentenceCase(text.toLowerCase());
    case "toggle":
      return toggleCase(text);
    case "camel":
      return toCamelCase(text);
    case "snake":
      return toSnakeCase(text);
    case "kebab":
      return toKebabCase(text);
    case "constant":
      return toConstantCase(text);
    default:
      return text;
  }
}

export const caseTypeLabels: Record<CaseType, string> = {
  upper: "UPPERCASE",
  lower: "lowercase",
  title: "Title Case",
  sentence: "Sentence case",
  toggle: "tOGGLE cASE",
  camel: "camelCase",
  snake: "snake_case",
  kebab: "kebab-case",
  constant: "CONSTANT_CASE",
};
