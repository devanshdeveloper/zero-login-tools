"use client";

import { useMemo, useState } from "react";
import { buildIframeSrcDoc } from "@/lib/engines/sandboxEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ExternalLink, Check } from "lucide-react";

const starterHtml = `<div class="wrap">
  <h1>Hello, Playground</h1>
  <p>Edit HTML/CSS/JS and see the preview update.</p>
  <button id="btn">Click me</button>
</div>`;

const starterCss = `body { font-family: system-ui, sans-serif; padding: 24px; }
.wrap { max-width: 720px; margin: 0 auto; }
button { padding: 10px 14px; border-radius: 10px; border: 1px solid #ddd; }`;

const starterJs = `document.getElementById("btn")?.addEventListener("click", () => {
  alert("Hello from JS!");
});`;

export function CodePlayground() {
  const [html, setHtml] = useState(starterHtml);
  const [css, setCss] = useState(starterCss);
  const [js, setJs] = useState(starterJs);
  const [copied, setCopied] = useState(false);

  const srcDoc = useMemo(() => buildIframeSrcDoc({ html, css, js }), [html, css, js]);

  const copy = async () => {
    await navigator.clipboard.writeText(srcDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const open = () => {
    const blob = new Blob([srcDoc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={copy} className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy srcDoc"}
        </Button>
        <Button variant="outline" size="sm" onClick={open} className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Open preview
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">HTML</p>
            <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="font-mono h-[160px] resize-none" spellCheck={false} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">CSS</p>
            <Textarea value={css} onChange={(e) => setCss(e.target.value)} className="font-mono h-[160px] resize-none" spellCheck={false} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">JavaScript</p>
            <Textarea value={js} onChange={(e) => setJs(e.target.value)} className="font-mono h-[160px] resize-none" spellCheck={false} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <p className="text-sm font-medium text-muted-foreground pl-2">Preview</p>
            <span className="text-xs text-muted-foreground pr-2">Sandboxed iframe</span>
          </div>
          <div className="border-2 border-border rounded-lg overflow-hidden bg-white">
            <iframe
              title="Code playground preview"
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-modals"
              className="w-full h-[560px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

