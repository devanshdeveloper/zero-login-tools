"use client";

import { useState, useMemo } from "react";
import { convertColor, ColorData } from "@/lib/engines/colorEngine";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const DEFAULT_COLOR = "#3b82f6";

export function ColorConverter() {
  const [input, setInput] = useState("#3B82F6");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const data: ColorData = useMemo(() => {
    const res = convertColor(input);
    return res.isValid ? res : convertColor(DEFAULT_COLOR);
  }, [input]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-end">
        <div className="w-full space-y-2">
          <Label>Enter Color (HEX, RGB)</Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#ff0000 or rgb(255, 0, 0)"
            className="w-full"
          />
        </div>
        <div
          className="h-12 w-full md:w-32 rounded-md border-2 border-border shadow-sm transition-colors shrink-0"
          style={{ backgroundColor: data.isValid ? data.hex : "transparent" }}
        />
      </div>

      <div className="space-y-4 pt-4">
        <ColorReadout
          label="HEX"
          value={data.hex}
          onCopy={() => handleCopy(data.hex, "hex")}
          copied={copiedField === "hex"}
        />
        <ColorReadout
          label="RGB"
          value={data.rgb}
          onCopy={() => handleCopy(data.rgb, "rgb")}
          copied={copiedField === "rgb"}
        />
        <ColorReadout
          label="HSL"
          value={data.hsl}
          onCopy={() => handleCopy(data.hsl, "hsl")}
          copied={copiedField === "hsl"}
        />
      </div>
    </div>
  );
}

function ColorReadout({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16">{label}</div>
      <Input value={value} readOnly />
      <Button variant="outline" size="icon" onClick={onCopy} disabled={!value}>
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}
