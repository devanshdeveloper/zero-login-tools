import { marked } from "marked";

export async function convertMarkdown(md: string): Promise<string> {
  if (!md.trim()) return "";
  try {
    return await marked.parse(md);
  } catch (err) {
    return "<p>Error converting markdown</p>";
  }
}
