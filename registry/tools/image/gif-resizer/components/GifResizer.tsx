"use client";

import { useState, useRef } from "react";
import { resizeImage } from "@/registry/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download } from "lucide-react";

export function GifResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [result, setResult] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type.startsWith("image/")) {
      setFile(f);
      setResult(null);
    }
  };

  const handleResize = async () => {
    if (!file) return;
    const w = parseInt(width, 10);
    if (!w || w < 1) return;
    setProcessing(true);
    try {
      const out = await resizeImage(file, { width: w, keepAspect: true });
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to resize.");
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
        accept="image/gif,image/*"
        className="hidden"
      />
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border p-12 text-center cursor-pointer hover:bg-muted/20 rounded-lg"
        >
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="font-medium">Click to upload GIF or image</p>
          <p className="text-sm text-muted-foreground mt-1">Resize by width (aspect ratio kept). Animated GIF: first frame only.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Width:</span>
              <input
                type="number"
                min={1}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-24 rounded border-2 border-border px-3 py-2"
              />
            </label>
            <Button onClick={handleResize} disabled={processing || !width}>
              Resize
            </Button>
          </div>
          {result && (
            <div className="border-2 border-border rounded-lg p-4 flex flex-col items-center gap-4">
              <p className="text-sm font-medium">{result.name}</p>
              <Button onClick={download} className="gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
