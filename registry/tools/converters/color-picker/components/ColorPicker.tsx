"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : null;
}

export function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  const rgb = hexToRgb(color);
  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Pick a color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
          />
        </div>
        <div
          className="w-24 h-24 rounded-lg border-2 border-border shadow-inner"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border-2 border-border rounded-lg p-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">HEX</p>
            <p className="font-mono font-medium">{color}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => copy(color)}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <div className="border-2 border-border rounded-lg p-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">RGB</p>
            <p className="font-mono font-medium">{rgbStr}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => copy(rgbStr)}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
