export interface WordWeight {
  word: string;
  count: number;
  weight: number; // 1–10 or similar for font size
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "as", "is", "was", "are", "were", "been", "be", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "shall", "can", "need", "dare", "ought", "used", "it", "its", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "what", "which", "who", "whom", "if", "then", "than", "so", "just", "when", "where", "why", "how", "all", "each", "every", "both", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "too", "very", "s", "t", "re", "ve", "ll", "d", "m",
]);

export function extractWordCloud(
  text: string,
  options: { minLength?: number; maxWords?: number; caseSensitive?: boolean } = {},
): WordWeight[] {
  const { minLength = 2, maxWords = 100, caseSensitive = false } = options;
  const normalized = caseSensitive ? text : text.toLowerCase();
  const words = normalized.replace(/[^\w\s'-]/g, " ").split(/\s+/).filter(Boolean);
  const countMap = new Map<string, number>();

  for (const w of words) {
    const word = w.replace(/^['"]|['"]$/g, "");
    if (word.length < minLength) continue;
    if (STOP_WORDS.has(word.toLowerCase())) continue;
    countMap.set(word, (countMap.get(word) ?? 0) + 1);
  }

  const sorted = [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxWords);

  const maxCount = sorted[0]?.[1] ?? 1;
  return sorted.map(([word, count]) => ({
    word,
    count,
    weight: Math.max(1, Math.ceil((count / maxCount) * 10)),
  }));
}
