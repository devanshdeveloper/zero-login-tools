"use client";

import { useState } from "react";
import {
  generateRandomText,
  generateRandomParagraphs,
  type RandomTextType,
} from "@/lib/engines/randomTextEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Shuffle } from "lucide-react";

const TYPES: { value: RandomTextType; label: string }[] = [
  { value: "lorem", label: "Lorem Ipsum" },
  { value: "words", label: "Random words" },
  { value: "mixed", label: "Mixed" },
];

export function RandomTextGenerator() {
  const [mode, setMode] = useState<"words" | "paragraphs">("words");
  const [wordCount, setWordCount] = useState(50);
  const [paragraphCount, setParagraphCount] = useState(3);
  const [minWords, setMinWords] = useState(30);
  const [maxWords, setMaxWords] = useState(80);
  const [textType, setTextType] = useState<RandomTextType>("lorem");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (mode === "words") {
      setOutput(generateRandomText(textType, wordCount, startWithLorem));
    } else {
      setOutput(
        generateRandomParagraphs(textType, paragraphCount, minWords, maxWords),
      );
    }
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Type:</span>
          <select
            value={textType}
            onChange={(e) => setTextType(e.target.value as RandomTextType)}
            className="rounded border-2 border-border px-3 py-1.5 text-sm bg-background"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm">Start with &quot;Lorem ipsum&quot;</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          variant={mode === "words" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("words")}
        >
          By word count
        </Button>
        <Button
          variant={mode === "paragraphs" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("paragraphs")}
        >
          By paragraphs
        </Button>
      </div>
      {mode === "words" ? (
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Words:</span>
            <input
              type="number"
              min={1}
              max={1000}
              value={wordCount}
              onChange={(e) => setWordCount(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 rounded border-2 border-border px-2 py-1 text-sm"
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Paragraphs:</span>
            <input
              type="number"
              min={1}
              max={20}
              value={paragraphCount}
              onChange={(e) => setParagraphCount(Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded border-2 border-border px-2 py-1 text-sm"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Words/para (min–max):</span>
            <input
              type="number"
              min={1}
              value={minWords}
              onChange={(e) => setMinWords(Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded border-2 border-border px-2 py-1 text-sm"
            />
            <span className="text-muted-foreground">–</span>
            <input
              type="number"
              min={1}
              value={maxWords}
              onChange={(e) => setMaxWords(Math.max(minWords, Number(e.target.value) || minWords))}
              className="w-16 rounded border-2 border-border px-2 py-1 text-sm"
            />
          </label>
        </div>
      )}
      <div className="flex gap-2">
        <Button onClick={generate} className="gap-2">
          <Shuffle className="w-4 h-4" /> Generate
        </Button>
        <Button variant="outline" onClick={copy} disabled={!output} className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy
        </Button>
      </div>
      <Textarea
        value={output}
        readOnly
        placeholder="Generated text will appear here..."
        className="font-mono min-h-[200px] resize-none bg-muted/30"
      />
    </div>
  );
}
