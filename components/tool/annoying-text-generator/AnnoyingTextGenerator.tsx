"use client";

import { useState } from "react";
import {
  transformAnnoying,
  annoyingStyleLabels,
  type AnnoyingStyle,
} from "@/lib/engines/annoyingTextEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const STYLES: AnnoyingStyle[] = [
  "zalgo",
  "alternating",
  "upsideDown",
  "stickyCaps",
  "spongebob",
  "wide",
  "tiny",
  "bubble",
  "doubleStruck",
  "circled",
  "fullwidth",
];

export function AnnoyingTextGenerator() {
  const [input, setInput] = useState("Hello World");
  const [output, setOutput] = useState("");
  const [style, setStyle] = useState<AnnoyingStyle>("zalgo");
  const [zalgoIntensity, setZalgoIntensity] = useState(3);
  const [copied, setCopied] = useState(false);

  const handleTransform = () => {
    setOutput(transformAnnoying(input, style, zalgoIntensity));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Input</h3>
            <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}>
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
            className="font-mono min-h-[120px] resize-none"
          />
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <Button
                key={s}
                variant={style === s ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setStyle(s);
                  setOutput(transformAnnoying(input, s, zalgoIntensity));
                }}
              >
                {annoyingStyleLabels[s]}
              </Button>
            ))}
          </div>
          {style === "zalgo" && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Zalgo intensity</label>
              <Slider
                value={[zalgoIntensity]}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  setZalgoIntensity(val);
                  setOutput(transformAnnoying(input, "zalgo", val));
                }}
                min={1}
                max={8}
                step={1}
              />
            </div>
          )}
          <Button onClick={handleTransform}>Transform</Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">Output</h3>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Transformed text..."
            className="font-mono min-h-[200px] resize-none bg-muted/30 break-all"
          />
        </div>
      </div>
    </div>
  );
}
