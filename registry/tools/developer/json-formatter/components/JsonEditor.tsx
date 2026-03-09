"use client";

import { useState } from "react";
import { formatJson, minifyJson } from "@/registry/tools/developer/json-formatter/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, Copy, FileJson, Minus } from "lucide-react";

export function JsonEditor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    const res = formatJson(input, 2);
    if (res.success) {
      setOutput(res.value);
      setError(null);
    } else {
      setError(res.error || "Invalid JSON");
    }
  };

  const handleMinify = () => {
    const res = minifyJson(input);
    if (res.success) {
      setOutput(res.value);
      setError(null);
    } else {
      setError(res.error || "Invalid JSON");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center h-8">
            <h3 className="text-sm font-medium text-muted-foreground">
              Input JSON
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInput("");
                setOutput("");
                setError(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            className="font-mono h-[400px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">
              Output JSON
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
              className="h-7 text-xs"
            >
              {copied ? (
                <Check className="w-3 h-3 mr-1" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="font-mono h-[400px] resize-none bg-muted/30 focus-visible:ring-0"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button
          onClick={handleFormat}
          className="gap-2 transition-transform active:scale-95"
        >
          <FileJson className="w-4 h-4" />
          Format JSON
        </Button>
        <Button
          onClick={handleMinify}
          variant="secondary"
          className="gap-2 transition-transform active:scale-95"
        >
          <Minus className="w-4 h-4" />
          Minify JSON
        </Button>
      </div>

      {error ? (
        <Alert
          variant="destructive"
          className="animate-in fade-in slide-in-from-top-2"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error parsing JSON</AlertTitle>
          <AlertDescription className="font-mono text-sm mt-2 break-all">
            {error}
          </AlertDescription>
        </Alert>
      ) : output ? (
        <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 animate-in fade-in">
          <Check className="h-4 w-4 !text-green-600 dark:!text-green-400" />
          <AlertTitle>Valid JSON</AlertTitle>
        </Alert>
      ) : null}
    </div>
  );
}
