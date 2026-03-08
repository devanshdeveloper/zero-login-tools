"use client";

import { useMemo, useState } from "react";
import { buildIframeSrcDoc } from "@/lib/engines/sandboxEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";

const starterHtml = `<div class="card">
  <h1>CSS Playground</h1>
  <p>Edit CSS and see the preview update.</p>
  <button>Button</button>
</div>`;

const starterCss = `body { font-family: system-ui, sans-serif; padding: 24px; background: #f6f7fb; }
.card { background: white; border: 1px solid #e5e7eb; padding: 18px; border-radius: 14px; max-width: 640px; margin: 0 auto; }
button { background: black; color: white; border: 0; padding: 10px 14px; border-radius: 10px; }`;

export function CssPlayground() {
  const [html, setHtml] = useState(starterHtml);
  const [css, setCss] = useState(starterCss);
  const srcDoc = useMemo(() => buildIframeSrcDoc({ html, css }), [html, css]);

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
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between h-8">
              <h3 className="text-sm font-medium text-muted-foreground">HTML (preview content)</h3>
              <Button variant="ghost" size="sm" onClick={() => setHtml("")}>
                Clear
              </Button>
            </div>
            <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="font-mono h-[180px] resize-none shadow-inner" spellCheck={false} />
          </div>
          <div>
            <div className="flex items-center justify-between h-8">
              <h3 className="text-sm font-medium text-muted-foreground">CSS</h3>
              <Button variant="ghost" size="sm" onClick={() => setCss("")}>
                Clear
              </Button>
            </div>
            <Textarea value={css} onChange={(e) => setCss(e.target.value)} className="font-mono h-[300px] resize-none shadow-inner" spellCheck={false} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Preview</h3>
          </div>
          <div className="border-2 border-border rounded-lg overflow-hidden bg-white">
            <iframe title="css-preview" srcDoc={srcDoc} sandbox="allow-scripts" className="w-full h-[520px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

