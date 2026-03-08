export type TextStats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
};

export function getTextStats(text: string): TextStats {
  const t = text ?? "";
  const characters = t.length;
  const charactersNoSpaces = t.replace(/\s/g, "").length;
  const words = t.trim() ? t.trim().split(/\s+/).length : 0;
  const lines = t === "" ? 0 : t.split(/\r\n|\r|\n/).length;
  const paragraphs = t.trim()
    ? t
        .trim()
        .split(/\n\s*\n/g)
        .filter((p) => p.trim().length > 0).length
    : 0;

  return { characters, charactersNoSpaces, words, lines, paragraphs };
}

export function downloadTextFile(
  filename: string,
  content: string,
  mime: string = "text/plain;charset=utf-8",
) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

