"use client";

import { useState, useRef } from "react";
import { removeBackground } from "@/lib/engines/backgroundRemoverEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, Download, Eraser } from "lucide-react";

export function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [targetColor, setTargetColor] = useState("#00ff00");
  const [tolerance, setTolerance] = useState(40);
  const [result, setResult] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type.startsWith("image/")) {
      setFile(f);
      setResult(null);
    }
  };

  const handleRemove = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const { r, g, b } = hexToRgb(targetColor);
      const out = await removeBackground(file, {
        targetR: r,
        targetG: g,
        targetB: b,
        tolerance,
        replaceWithTransparent: true,
      });
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to remove background.");
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    if (!result) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
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
          <p className="text-sm text-muted-foreground mt-1">Remove background by color (e.g. green screen)</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Color to remove (pick background color)</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={targetColor}
                    onChange={(e) => setTargetColor(e.target.value)}
                    className="w-12 h-12 rounded border-2 border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={targetColor}
                    onChange={(e) => setTargetColor(e.target.value)}
                    className="font-mono rounded border-2 border-border px-3 py-2 flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>Tolerance (0–255): {tolerance}</Label>
                <input
                  type="range"
                  min={0}
                  max={120}
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </div>
              <Button onClick={handleRemove} disabled={processing} className="gap-2">
                <Eraser className="w-4 h-4" /> Remove background
              </Button>
            </div>
            {result && (
              <div className="border-2 border-border rounded-lg p-4 flex flex-col items-center gap-4">
                <p className="text-sm font-medium">Result (PNG with transparency)</p>
                <Button onClick={download} className="gap-2">
                  <Download className="w-4 h-4" /> Download
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
