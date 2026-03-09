"use client";

import { useMemo, useState } from "react";
import { getTextStats, downloadTextFile } from "@/registry/engines/textStatsEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Download, Trash2 } from "lucide-react";

export function SimpleTextEditor() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => getTextStats(text), [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Words: <span className="text-foreground font-medium">{stats.words}</span> • Characters:{" "}
          <span className="text-foreground font-medium">{stats.characters}</span> • Lines:{" "}
          <span className="text-foreground font-medium">{stats.lines}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copy} disabled={!text}>
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadTextFile("note.txt", text)}
            disabled={!text}
          >
            <Download className="w-4 h-4 mr-2" />
            Download .txt
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={!text}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
        className="font-mono h-[520px] resize-none shadow-inner"
        spellCheck={false}
      />

      <div className="text-xs text-muted-foreground">
        Characters (no spaces): {stats.charactersNoSpaces} • Paragraphs: {stats.paragraphs}
      </div>
    </div>
  );
}

