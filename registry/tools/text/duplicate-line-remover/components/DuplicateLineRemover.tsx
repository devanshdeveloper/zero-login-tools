"use client";

import { useState } from "react";
import { removeDuplicateLines } from "@/registry/tools/text/duplicate-line-remover/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export function DuplicateLineRemover() {
  const [input, setInput] = useState("apple\nbanana\napple\ncherry\nbanana");
  const [output, setOutput] = useState("");
  const [trim, setTrim] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [keepEmpty, setKeepEmpty] = useState(false);
  const [stats, setStats] = useState<{ removed: number; unique: number; total: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRemove = () => {
    const result = removeDuplicateLines(input, { trim, caseSensitive, keepEmpty });
    setOutput(result.output);
    setStats({
      removed: result.removedCount,
      unique: result.uniqueCount,
      total: result.totalCount,
    });
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trim}
            onChange={(e) => setTrim(e.target.checked)}
            className="rounded border-border"
          />
          <Label>Trim whitespace</Label>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded border-border"
          />
          <Label>Case sensitive</Label>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={keepEmpty}
            onChange={(e) => setKeepEmpty(e.target.checked)}
            className="rounded border-border"
          />
          <Label>Keep empty lines</Label>
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Input (one per line)</h3>
            <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); setStats(null); }}>
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste lines with duplicates..."
            className="font-mono min-h-[240px] resize-none"
          />
          <Button onClick={handleRemove}>Remove duplicates</Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Unique lines</h3>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              Copy
            </Button>
          </div>
          {stats && (
            <p className="text-xs text-muted-foreground">
              {stats.unique} unique · {stats.removed} removed · {stats.total} total
            </p>
          )}
          <Textarea
            value={output}
            readOnly
            placeholder="Deduplicated output..."
            className="font-mono min-h-[240px] resize-none bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
}
