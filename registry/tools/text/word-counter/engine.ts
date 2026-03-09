export interface CountResult {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  sentences: number;
}

export function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function countCharacters(text: string, includeSpaces = true): number {
  if (includeSpaces) return text.length;
  return text.replace(/\s/g, "").length;
}

export function countLines(text: string): number {
  if (!text) return 0;
  const lines = text.split(/\r?\n/);
  return lines.length;
}

export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\n\s*\n/).filter(Boolean).length;
}

export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const matches = text.match(/[.!?]+/g);
  return matches ? matches.length : 0;
}

export function getCountResult(text: string): CountResult {
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: countWords(text),
    lines: countLines(text),
    paragraphs: countParagraphs(text),
    sentences: countSentences(text),
  };
}
