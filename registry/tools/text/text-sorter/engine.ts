export type SortOrder = "asc" | "desc" | "random" | "length-asc" | "length-desc";

export function sortLines(text: string, order: SortOrder): string {
  const lines = text.split(/\r?\n/).filter((line) => line.length > 0);
  if (lines.length === 0) return "";

  switch (order) {
    case "asc":
      return [...lines].sort((a, b) => a.localeCompare(b)).join("\n");
    case "desc":
      return [...lines].sort((a, b) => b.localeCompare(a)).join("\n");
    case "random":
      return [...lines].sort(() => Math.random() - 0.5).join("\n");
    case "length-asc":
      return [...lines].sort((a, b) => a.length - b.length).join("\n");
    case "length-desc":
      return [...lines].sort((a, b) => b.length - a.length).join("\n");
    default:
      return text;
  }
}

export const sortOrderLabels: Record<SortOrder, string> = {
  asc: "A → Z",
  desc: "Z → A",
  random: "Random",
  "length-asc": "Shortest first",
  "length-desc": "Longest first",
};
