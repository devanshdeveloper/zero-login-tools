"use client";

import { useState } from "react";
import { htmlToMarkdown } from "@/registry/tools/formatting/html-to-markdown/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Trash2 } from "lucide-react";

export function HtmlToMarkdown() {
  const [html, setHtml] = useState("<h1>Hello</h1><p>This is <strong>bold</strong>.</p>");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setMarkdown(htmlToMarkdown(html));
  };

  const handleCopy = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">HTML</h3>
            <Button variant="ghost" size="sm" onClick={() => { setHtml(""); setMarkdown(""); }}>
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <Textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste HTML here..."
            className="font-mono min-h-[280px] resize-none"
          />
          <Button onClick={handleConvert}>Convert to Markdown</Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Markdown</h3>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!markdown}>
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              Copy
            </Button>
          </div>
          <Textarea
            value={markdown}
            readOnly
            placeholder="Markdown output..."
            className="font-mono min-h-[280px] resize-none bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
}
