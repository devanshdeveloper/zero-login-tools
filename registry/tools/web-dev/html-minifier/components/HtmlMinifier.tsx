"use client";

import { useState } from "react";
import { minifyHtml } from "@/registry/tools/web-dev/html-minifier/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Minus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function HtmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    compressionRatio: number;
  } | null>(null);

  const handleMinify = () => {
    const result = minifyHtml(input);
    if (result.success) {
      setOutput(result.minified);
      setStats({
        originalSize: result.originalSize,
        minifiedSize: result.minifiedSize,
        compressionRatio: result.compressionRatio,
      });
    } else {
      setOutput(result.minified);
      setStats(null);
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
              HTML Input
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInput("");
                setOutput("");
                setStats(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<html>...</html>"
            className="font-mono h-[400px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">
              Minified Output
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
            placeholder="Minified HTML will appear here..."
            className="font-mono h-[400px] resize-none bg-muted/30 focus-visible:ring-0"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button
          onClick={handleMinify}
          className="gap-2 transition-transform active:scale-95"
        >
          <Minus className="w-4 h-4" />
          Minify HTML
        </Button>
      </div>

      {stats && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
          <Check className="h-4 w-4 !text-blue-600 dark:!text-blue-400" />
          <AlertTitle>Compression Stats</AlertTitle>
          <AlertDescription className="mt-2 space-y-1">
            <div>Original Size: {stats.originalSize} bytes</div>
            <div>Minified Size: {stats.minifiedSize} bytes</div>
            <div>Compression: {stats.compressionRatio}% reduction</div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
