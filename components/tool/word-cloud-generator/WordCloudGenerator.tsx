"use client";

import { useState, useMemo } from "react";
import { extractWordCloud } from "@/lib/engines/wordCloudEngine";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function WordCloudGenerator() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog. The fox runs fast. The dog sleeps. Quick brown fox.",
  );
  const [maxWords, setMaxWords] = useState(50);
  const [minLength, setMinLength] = useState(2);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const words = useMemo(
    () =>
      extractWordCloud(text, {
        maxWords,
        minLength,
        caseSensitive,
      }),
    [text, maxWords, minLength, caseSensitive],
  );

  const maxWeight = Math.max(...words.map((w) => w.weight), 1);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Paste or type text</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to generate a word cloud..."
              className="font-mono min-h-[220px] resize-none mt-2"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Max words:</span>
              <input
                type="number"
                min={10}
                max={200}
                value={maxWords}
                onChange={(e) => setMaxWords(Math.max(10, Math.min(200, Number(e.target.value) || 10)))}
                className="w-16 rounded border-2 border-border px-2 py-1 text-sm"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Min length:</span>
              <input
                type="number"
                min={1}
                max={10}
                value={minLength}
                onChange={(e) => setMinLength(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="w-14 rounded border-2 border-border px-2 py-1 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Case sensitive</span>
            </label>
          </div>
        </div>
        <div className="border-2 border-border rounded-lg p-6 bg-muted/10 min-h-[220px] flex flex-wrap items-center justify-center gap-2 content-center">
          {words.length === 0 ? (
            <p className="text-sm text-muted-foreground">Enter text to see word cloud</p>
          ) : (
            words.map((w) => (
              <span
                key={w.word}
                className="inline-block px-1.5 py-0.5 rounded hover:bg-muted/50 transition-colors cursor-default"
                style={{
                  fontSize: `${0.75 + (w.weight / maxWeight) * 1.5}rem`,
                  fontWeight: 400 + w.weight * 50,
                }}
                title={`${w.word}: ${w.count}`}
              >
                {w.word}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
