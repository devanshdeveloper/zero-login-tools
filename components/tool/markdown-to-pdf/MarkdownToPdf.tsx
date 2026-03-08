"use client";

import { useMemo, useRef, useState } from "react";
import { marked } from "marked";
import { htmlElementToPdfBlob } from "@/lib/engines/domPdfEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, FileText, RefreshCw } from "lucide-react";

export function MarkdownToPdf() {
  const [markdown, setMarkdown] = useState<string>("# Hello\n\nPaste **Markdown** here and export to PDF.");
  const [isWorking, setIsWorking] = useState(false);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    try {
      return marked.parse(markdown ?? "");
    } catch {
      return "<p>Failed to render Markdown.</p>";
    }
  }, [markdown]);

  const run = async () => {
    if (!previewRef.current) return;
    setIsWorking(true);
    setOutBlob(null);
    try {
      const blob = await htmlElementToPdfBlob(previewRef.current, { format: "a4", marginMm: 10 });
      setOutBlob(blob);
    } catch (e) {
      console.error(e);
      alert("Failed to export Markdown to PDF.");
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!outBlob) return;
    const url = URL.createObjectURL(outBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">Markdown</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMarkdown("");
                setOutBlob(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write Markdown here..."
            className="font-mono h-[420px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Preview</h3>
          </div>
          <div className="border-2 border-border rounded-lg p-4 bg-muted/10 h-[420px] overflow-auto">
            <div
              ref={previewRef}
              className="prose prose-sm dark:prose-invert max-w-none"
              // Marked renders HTML; this is entirely local to the user's browser.
              dangerouslySetInnerHTML={{ __html: html as string }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={run} disabled={isWorking} className="gap-2">
          {isWorking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          Export to PDF
        </Button>
        {outBlob && (
          <Button onClick={download} variant="secondary" className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: embedded remote images may be blocked by CORS during PDF rendering. For best results, use text-only or same-origin assets.
      </p>
    </div>
  );
}

