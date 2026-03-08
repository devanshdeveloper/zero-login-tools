"use client";

import { useState } from "react";
import {
  getRandomEmojis,
  getCategoryNames,
} from "@/lib/engines/emojiGeneratorEngine";
import { Button } from "@/components/ui/button";
import { Check, Copy, Shuffle } from "lucide-react";

export function EmojiGenerator() {
  const [count, setCount] = useState(5);
  const [category, setCategory] = useState<string>("All");
  const [emojis, setEmojis] = useState<string[]>(() => getRandomEmojis(5));
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setEmojis(
      getRandomEmojis(count, category === "All" ? undefined : category),
    );
  };

  const copyAll = () => {
    navigator.clipboard.writeText(emojis.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ["All", ...getCategoryNames()];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Count:</span>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
            className="w-16 rounded border-2 border-border px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border-2 border-border px-3 py-1.5 text-sm bg-background"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={generate} className="gap-2">
          <Shuffle className="w-4 h-4" /> Generate
        </Button>
        <Button variant="outline" onClick={copyAll} disabled={emojis.length === 0} className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy all"}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 text-4xl min-h-[80px] p-4 border-2 border-border rounded-lg bg-muted/20">
        {emojis.map((e, i) => (
          <span
            key={i}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => {
              navigator.clipboard.writeText(e);
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
            title="Click to copy"
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
