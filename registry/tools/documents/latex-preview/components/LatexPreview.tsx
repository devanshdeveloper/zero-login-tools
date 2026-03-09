"use client";

import { useMemo, useState } from "react";
import "katex/dist/katex.min.css";
import { renderLatexToHtml } from "@/registry/tools/documents/latex-preview/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Copy, Check } from "lucide-react";

export function LatexPreview() {
  const [input, setInput] = useState(
    String.raw`\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}`,
  );
  const [displayMode, setDisplayMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const res = useMemo(
    () => renderLatexToHtml(input, { displayMode }),
    [input, displayMode],
  );

  const copyHtml = async () => {
    if (!res.html) return;
    await navigator.clipboard.writeText(res.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">LaTeX input</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInput("");
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={String.raw`\frac{a}{b}`}
            className="font-mono h-[260px] resize-none shadow-inner"
            spellCheck={false}
          />

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={displayMode}
              onChange={(e) => setDisplayMode(e.target.checked)}
            />
            <span className="text-sm">Display mode</span>
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyHtml}
              disabled={!res.html}
              className="h-7 text-xs"
            >
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? "Copied" : "Copy HTML"}
            </Button>
          </div>
          <div className="border-2 border-border rounded-lg p-4 bg-white text-black min-h-[260px] overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: res.html }} />
          </div>
        </div>
      </div>

      {!res.success && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>LaTeX error</AlertTitle>
          <AlertDescription className="font-mono text-sm mt-2 break-all">
            {res.error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

