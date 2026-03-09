"use client";

import { useState } from "react";
import {
  sortLines,
  sortOrderLabels,
  type SortOrder,
} from "@/registry/tools/text/text-sorter/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Trash2 } from "lucide-react";

const ORDERS: SortOrder[] = [
  "asc",
  "desc",
  "random",
  "length-asc",
  "length-desc",
];

export function TextSorter() {
  const [input, setInput] = useState("banana\napple\ncherry\ndate");
  const [output, setOutput] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [copied, setCopied] = useState(false);

  const handleSort = () => {
    setOutput(sortLines(input, order));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-2">
        {ORDERS.map((o: any) => (
          <Button
            key={o}
            variant={order === o ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setOrder(o as SortOrder);
              setOutput(sortLines(input, o));
            }}
          >
            {sortOrderLabels[o as SortOrder]}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">
              Lines (one per line)
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter one item per line..."
            className="font-mono min-h-[240px] resize-none"
          />
          <Button onClick={handleSort}>Sort</Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">
              Sorted
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
            >
              {copied ? (
                <Check className="w-3 h-3 mr-1" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Sorted output..."
            className="font-mono min-h-[240px] resize-none bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
}
