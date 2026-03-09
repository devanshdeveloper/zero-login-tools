"use client";

import { useState, useRef } from "react";
import { rotateImage, type RotateAngle } from "@/registry/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download, RotateCw } from "lucide-react";

const ANGLES: RotateAngle[] = [90, 180, 270];

export function ImageRotator() {
  const [file, setFile] = useState<File | null>(null);
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

  const handleRotate = async (angle: RotateAngle) => {
    if (!file) return;
    setProcessing(true);
    try {
      const out = await rotateImage(file, angle);
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to rotate.");
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
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ANGLES.map((angle) => (
              <Button
                key={angle}
                onClick={() => handleRotate(angle)}
                disabled={processing}
                className="gap-2"
              >
                <RotateCw className="w-4 h-4" /> {angle}°
              </Button>
            ))}
          </div>
          {result && (
            <div className="flex flex-col items-center gap-4 border-2 border-border rounded-lg p-4">
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
