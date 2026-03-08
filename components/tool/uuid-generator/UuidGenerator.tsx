"use client";

import { useState, useEffect } from "react";
import { generateUuids } from "@/lib/engines/uuidEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    // cap at 1000 for browser perf
    const safeCount = Math.min(Math.max(1, count), 1000);
    setUuids(generateUuids(safeCount));
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    const text = uuids.join("\n");
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="space-y-2 flex-1 max-w-[200px]">
          <Label htmlFor="count">Number of UUIDs</Label>
          <Input
            id="count"
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          />
        </div>
        <Button onClick={handleGenerate} className="gap-2 w-full sm:w-auto">
          <RefreshCw className="w-4 h-4" />
          Generate New
        </Button>
        <Button
          variant="secondary"
          onClick={handleCopy}
          className="gap-2 w-full sm:w-auto ml-auto"
          disabled={uuids.length === 0}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          Copy All
        </Button>
      </div>

      <div className="p-4">
        <Textarea value={uuids.join("\n")} readOnly className="h-[300px]" />
      </div>
    </div>
  );
}
