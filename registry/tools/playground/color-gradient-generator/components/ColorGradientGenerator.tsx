"use client";

import { useMemo, useState } from "react";
import { buildLinearGradientCss, generateGradientStops } from "@/registry/tools/playground/color-gradient-generator/engine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";

export function ColorGradientGenerator() {
  const [from, setFrom] = useState("#2563EB");
  const [to, setTo] = useState("#F97316");
  const [steps, setSteps] = useState("8");
  const [angle, setAngle] = useState("90");
  const [copied, setCopied] = useState(false);

  const stopsRes = useMemo(
    () => generateGradientStops(from, to, parseInt(steps || "8", 10)),
    [from, to, steps],
  );
  const css = useMemo(() => {
    if (!stopsRes.success) return "";
    return buildLinearGradientCss(stopsRes.stops, parseInt(angle || "90", 10));
  }, [stopsRes, angle]);

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">From</p>
          <div className="flex gap-2">
            <input type="color" value={from} onChange={(e) => setFrom(e.target.value)} className="h-10 w-10 rounded border-2 border-border p-1 bg-background" />
            <Input value={from} onChange={(e) => setFrom(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">To</p>
          <div className="flex gap-2">
            <input type="color" value={to} onChange={(e) => setTo(e.target.value)} className="h-10 w-10 rounded border-2 border-border p-1 bg-background" />
            <Input value={to} onChange={(e) => setTo(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Steps</p>
          <Input type="number" min={2} max={50} value={steps} onChange={(e) => setSteps(e.target.value)} className="font-mono" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Angle (deg)</p>
          <Input type="number" min={0} max={360} value={angle} onChange={(e) => setAngle(e.target.value)} className="font-mono" />
        </div>
      </div>

      <div className="border-2 border-border rounded-lg p-4 space-y-4">
        <div className="h-24 rounded-lg border border-border" style={{ background: css || undefined }} />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="text-sm font-medium">CSS</p>
            <p className="text-xs text-muted-foreground break-all font-mono">
              {css ? `background: ${css};` : stopsRes.success ? "—" : stopsRes.error}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={copy} disabled={!css} className="gap-2 shrink-0">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy CSS"}
          </Button>
        </div>

        {stopsRes.success && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {stopsRes.stops.map((c: any) => (
              <div key={c} className="border border-border rounded-md overflow-hidden">
                <div className="h-10" style={{ background: c }} />
                <div className="px-2 py-1 text-[11px] font-mono text-muted-foreground truncate">{c}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

