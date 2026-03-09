"use client";

import { useState, useRef } from "react";
import { extractPalette } from "@/registry/tools/image/palette-generator/engine";
import { Button } from "@/components/ui/button";
import { UploadCloud, Palette, Check } from "lucide-react";

export function PaletteGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [colors, setColors] = useState<Awaited<ReturnType<typeof extractPalette>>>([]);
  const [loading, setLoading] = useState(false);
  const [maxColors, setMaxColors] = useState(8);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f?.type.startsWith("image/")) return;
    setFile(f);
    setLoading(true);
    try {
      const pal = await extractPalette(f, maxColors);
      setColors(pal);
    } catch (e) {
      console.error(e);
      setColors([]);
    } finally {
      setLoading(false);
    }
  };

  const extract = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const pal = await extractPalette(file, maxColors);
      setColors(pal);
    } finally {
      setLoading(false);
    }
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="p-6 space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border p-12 text-center cursor-pointer hover:bg-muted/20 rounded-lg"
        >
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="font-medium">Click to upload image</p>
          <p className="text-sm text-muted-foreground mt-1">Extract color palette</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium">{file.name}</p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Colors:</label>
              <select
                value={maxColors}
                onChange={(e) => setMaxColors(Number(e.target.value))}
                className="rounded border-2 border-border px-2 py-1 text-sm"
              >
                {[4, 6, 8, 10, 12].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                Change
              </Button>
              <Button size="sm" onClick={extract} disabled={loading} className="gap-2">
                <Palette className="w-4 h-4" /> Extract
              </Button>
            </div>
          </div>
          {loading && <p className="text-sm text-muted-foreground">Extracting colors…</p>}
          {colors.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {colors.map((c: any) => (
                <div
                  key={c.hex}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => copyHex(c.hex)}
                    className="w-14 h-14 rounded-lg border-2 border-border shadow-sm hover:scale-105 transition-transform"
                    style={{ backgroundColor: c.hex }}
                    title={c.hex}
                  />
                  <span className="text-xs font-mono">
                    {copied === c.hex ? <Check className="w-3 h-3 inline text-green-500" /> : c.hex}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
