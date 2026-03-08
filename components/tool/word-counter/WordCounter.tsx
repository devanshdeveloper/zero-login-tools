"use client";

import { useState, useMemo } from "react";
import { getCountResult } from "@/lib/engines/wordCounterEngine";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Hash, Type, AlignLeft, List, MessageSquare } from "lucide-react";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => getCountResult(text), [text]);

  const items = [
    { label: "Words", value: stats.words, icon: FileText },
    { label: "Characters", value: stats.characters, icon: Type },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, icon: Hash },
    { label: "Lines", value: stats.lines, icon: AlignLeft },
    { label: "Paragraphs", value: stats.paragraphs, icon: List },
    { label: "Sentences", value: stats.sentences, icon: MessageSquare },
  ];

  return (
    <div className="p-6 space-y-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here to count words, characters, lines, paragraphs, and sentences..."
        className="font-mono min-h-[280px] resize-none"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="border-2 border-border rounded-lg p-4 bg-muted/20 text-center"
          >
            <Icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
