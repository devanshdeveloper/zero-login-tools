"use client";

import { useRef, useState } from "react";
import { htmlElementToPdfBlob } from "@/registry/engines/domPdfEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, FileText, RefreshCw } from "lucide-react";

const starterHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Sample</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 24px; }
      h1 { margin: 0 0 8px; }
      .muted { color: #555; }
      .box { border: 1px solid #ddd; padding: 12px; border-radius: 8px; }
    </style>
  </head>
  <body>
    <h1>HTML → PDF</h1>
    <p class="muted">Paste your HTML and export a PDF. Runs locally in your browser.</p>
    <div class="box">
      <strong>Note:</strong> external images may be blocked by CORS.
    </div>
  </body>
</html>`;

export function HtmlToPdf() {
  const [html, setHtml] = useState<string>(starterHtml);
  const [isWorking, setIsWorking] = useState(false);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const renderRef = useRef<HTMLDivElement>(null);

  const run = async () => {
    if (!renderRef.current) return;
    setIsWorking(true);
    setOutBlob(null);
    try {
      const blob = await htmlElementToPdfBlob(renderRef.current, { format: "a4", marginMm: 10 });
      setOutBlob(blob);
    } catch (e) {
      console.error(e);
      alert("Failed to export HTML to PDF.");
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
            <h3 className="text-sm font-medium text-muted-foreground">HTML</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setHtml("");
                setOutBlob(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="<h1>Hello</h1>"
            className="font-mono h-[420px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Rendered preview</h3>
          </div>
          <div className="border-2 border-border rounded-lg p-4 bg-white text-black h-[420px] overflow-auto">
            <div ref={renderRef} dangerouslySetInnerHTML={{ __html: html }} />
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
        This export renders the HTML in a sandboxed container and then prints it to PDF using client-side rendering.
      </p>
    </div>
  );
}

