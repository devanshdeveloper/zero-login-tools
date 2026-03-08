"use client";

import { useState, useRef, ChangeEvent } from "react";
import { resizeImage, formatBytes } from "@/lib/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, Download, Image as ImageIcon, RefreshCw } from "lucide-react";

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepAspect, setKeepAspect] = useState(true);
  const [result, setResult] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const process = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const w = width ? parseInt(width, 10) : undefined;
      const h = height ? parseInt(height, 10) : undefined;
      const out = await resizeImage(file, { width: w, height: h, keepAspect });
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to resize image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f?.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    setWidth("");
    setHeight("");
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
        onChange={onFileChange}
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
          <p className="text-sm text-muted-foreground mt-1">PNG, JPEG, WebP</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Width</Label>
                  <input
                    type="number"
                    min={1}
                    placeholder="auto"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                  />
                </div>
                <div>
                  <Label>Height</Label>
                  <input
                    type="number"
                    min={1}
                    placeholder="auto"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepAspect}
                  onChange={(e) => setKeepAspect(e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm">Keep aspect ratio</span>
              </label>
              <Button onClick={process} disabled={isProcessing} className="gap-2">
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                Resize
              </Button>
            </div>
            {result && (
              <div className="border-2 border-border rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                <p className="text-sm font-medium">{result.name}</p>
                <p className="text-sm text-muted-foreground">{formatBytes(result.size)}</p>
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
