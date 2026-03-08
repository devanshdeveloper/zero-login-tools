"use client";

import { useState } from "react";
import { convertCase, caseTypeLabels, type CaseType } from "@/lib/engines/textCaseEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Trash2 } from "lucide-react";

const CASE_OPTIONS: CaseType[] = [
  "upper",
  "lower",
  "title",
  "sentence",
  "toggle",
  "camel",
  "snake",
  "kebab",
  "constant",
];

export function TextCaseConverter() {
  const [input, setInput] = useState("hello world example");
  const [output, setOutput] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("title");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setOutput(convertCase(input, selectedCase));
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
        {CASE_OPTIONS.map((c) => (
          <Button
            key={c}
            variant={selectedCase === c ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedCase(c);
              setOutput(convertCase(input, c));
            }}
          >
            {caseTypeLabels[c]}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Input</h3>
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
            placeholder="Type or paste text..."
            className="font-mono min-h-[200px] resize-none"
          />
          <Button onClick={handleConvert} className="w-full">
            Convert to {caseTypeLabels[selectedCase]}
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Output</h3>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Converted text..."
            className="font-mono min-h-[200px] resize-none bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
}
