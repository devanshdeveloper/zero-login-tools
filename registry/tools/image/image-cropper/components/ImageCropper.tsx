"use client";

import { useState, useRef, useEffect } from "react";
import { cropImage, type CropRect } from "@/registry/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, Download, Crop } from "lucide-react";

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, width: 0, height: 0 });
  const [result, setResult] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type.startsWith("image/")) {
      setFile(f);
      setResult(null);
    }
  };

  const onImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    setDimensions({ w, h });
    setCrop({ x: 0, y: 0, width: w, height: h });
  };

  const handleCrop = async () => {
    if (!file || crop.width <= 0 || crop.height <= 0) return;
    setProcessing(true);
    try {
      const out = await cropImage(file, crop);
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to crop.");
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

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

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
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          <div className="border-2 border-border rounded-lg overflow-hidden max-h-[320px] bg-muted/20">
            <img
              ref={imgRef}
              src={src ?? ""}
              alt="Crop preview"
              className="max-w-full h-auto block"
              onLoad={onImageLoad}
            />
          </div>
          {dimensions.w > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label>X</Label>
                <input
                  type="number"
                  min={0}
                  max={dimensions.w}
                  value={crop.x}
                  onChange={(e) =>
                    setCrop((c: any) => ({
                      ...c,
                      x: clamp(parseInt(e.target.value, 10) || 0, 0, dimensions.w - 1),
                    }))
                  }
                  className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                />
              </div>
              <div>
                <Label>Y</Label>
                <input
                  type="number"
                  min={0}
                  max={dimensions.h}
                  value={crop.y}
                  onChange={(e) =>
                    setCrop((c: any) => ({
                      ...c,
                      y: clamp(parseInt(e.target.value, 10) || 0, 0, dimensions.h - 1),
                    }))
                  }
                  className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                />
              </div>
              <div>
                <Label>Width</Label>
                <input
                  type="number"
                  min={1}
                  max={dimensions.w}
                  value={crop.width}
                  onChange={(e) =>
                    setCrop((c: any) => ({
                      ...c,
                      width: clamp(parseInt(e.target.value, 10) || 1, 1, dimensions.w - c.x),
                    }))
                  }
                  className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                />
              </div>
              <div>
                <Label>Height</Label>
                <input
                  type="number"
                  min={1}
                  max={dimensions.h}
                  value={crop.height}
                  onChange={(e) =>
                    setCrop((c: any) => ({
                      ...c,
                      height: clamp(parseInt(e.target.value, 10) || 1, 1, dimensions.h - c.y),
                    }))
                  }
                  className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                />
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={handleCrop} disabled={processing || dimensions.w === 0} className="gap-2">
              <Crop className="w-4 h-4" /> Crop
            </Button>
            {result && (
              <Button onClick={download} className="gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
