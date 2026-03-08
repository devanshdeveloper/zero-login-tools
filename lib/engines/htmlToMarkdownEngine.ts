import TurndownService from "turndown";

let service: TurndownService | null = null;

function getTurndownService(): TurndownService {
  if (!service) {
    service = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });
  }
  return service;
}

export function htmlToMarkdown(html: string): string {
  if (!html || !html.trim()) return "";
  try {
    const td = getTurndownService();
    return td.turndown(html);
  } catch {
    return "";
  }
}
