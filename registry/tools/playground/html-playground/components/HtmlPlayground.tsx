"use client";

import { useMemo, useState } from "react";
import { buildIframeSrcDoc } from "@/registry/engines/sandboxEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";

const starter = `<h1>HTML Playground</h1>
<p>Edit HTML and see the preview update.</p>
<ul>
  <li>Fully client-side</li>
  <li>No login</li>
</ul>`;

export function HtmlPlayground() {
  const [html, setHtml] = useState(starter);
  const srcDoc = useMemo(() => buildIframeSrcDoc({ html }), [html]);

  const open = () => {
    const blob = new Blob([srcDoc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={open} className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Open preview
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">HTML</h3>
            <Button variant="ghost" size="sm" onClick={() => setHtml("")}>
              Clear
            </Button>
          </div>
          <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="font-mono h-[520px] resize-none shadow-inner" spellCheck={false} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Preview</h3>
          </div>
          <div className="border-2 border-border rounded-lg overflow-hidden bg-white">
            <iframe title="html-preview" srcDoc={srcDoc} sandbox="allow-scripts" className="w-full h-[520px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

