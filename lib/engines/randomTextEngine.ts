const LOREM = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum",
];

const WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us", "is", "are", "was", "were", "been", "has", "had", "did", "does", "very", "own", "same", "right", "still", "here", "where", "every", "each", "few", "more", "many", "such", "through", "during", "before", "between", "under", "again", "above", "below", "never", "always", "often", "sometimes", "really", "almost", "already", "together", "another", "something", "nothing", "everything", "anything", "someone", "everyone", "anyone", "nobody", "everybody", "somebody", "anybody",
];

export type RandomTextType = "lorem" | "words" | "mixed";

export function generateRandomText(
  type: RandomTextType,
  wordCount: number,
  startWithLorem = true,
): string {
  const pool = type === "lorem" ? LOREM : type === "words" ? WORDS : [...LOREM, ...WORDS];
  const words: string[] = [];

  if (startWithLorem && type !== "words" && wordCount >= 2) {
    words.push("Lorem");
    words.push("ipsum");
    wordCount -= 2;
  }

  for (let i = 0; i < wordCount; i++) {
    const w = pool[Math.floor(Math.random() * pool.length)] ?? "lorem";
    words.push(i === 0 && (startWithLorem || type === "lorem") ? w.charAt(0).toUpperCase() + w.slice(1) : w);
  }

  return words.join(" ");
}

export function generateRandomParagraphs(
  type: RandomTextType,
  paragraphCount: number,
  minWordsPerParagraph: number,
  maxWordsPerParagraph: number,
): string {
  const paragraphs: string[] = [];
  for (let p = 0; p < paragraphCount; p++) {
    const wordCount =
      minWordsPerParagraph +
      Math.floor(Math.random() * (maxWordsPerParagraph - minWordsPerParagraph + 1));
    const startWithLorem = p === 0 && type !== "words";
    paragraphs.push(generateRandomText(type, wordCount, startWithLorem));
  }
  return paragraphs.join("\n\n");
}
