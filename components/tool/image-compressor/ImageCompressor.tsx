"use client";

import { useState, useRef, ChangeEvent } from "react";
import { compressImage, formatBytes } from "@/lib/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (file: File, q: number) => {
    setIsProcessing(true);
    try {
      const result = await compressImage(file, {
        format: "image/jpeg",
        quality: q,
      });
      setCompressedFile(result);
    } catch (err) {
      console.error(err);
      alert("Failed to compress image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only accept images
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setOriginalFile(file);
    processImage(file, quality);
  };

  const handleQualityChange = (val: number | readonly number[]) => {
    const q = Array.isArray(val) ? val[0] : typeof val === "number" ? val : 0.8;
    setQuality(q);
    if (originalFile) {
      // Debounce process to avoid lagging slider
      // Using a quick synchronous call for simplicity, but could be slow for huge images
      processImage(originalFile, q);
    }
  };

  const downloadCompressed = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = compressedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 space-y-8 max-w-3xl mx-auto">
      {!originalFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border shadow-sm p-16 text-center hover:bg-muted/20 transition-all cursor-pointer flex flex-col items-center justify-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UploadCloud className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Click to upload image</h3>
            <p className="text-muted-foreground text-sm mt-1">
              JPEG, PNG, WebP highly supported.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <ImageIcon className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm line-clamp-1">
                  {originalFile.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Original: {formatBytes(originalFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOriginalFile(null);
                setCompressedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              Change Image
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-muted/20 p-6 border-2 border-border shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label className="text-base text-muted-foreground">
                  Compression Quality
                </Label>
                <span className="font-semibold bg-background border-2 border-border px-2 py-1 text-sm shadow-sm">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={handleQualityChange}
                min={0.1}
                max={1}
                step={0.05}
                className="py-4"
              />
              <p className="text-xs text-muted-foreground">
                Lower quality yields smaller file sizes but introduces visual
                artifacts.
              </p>
            </div>

            <div className="bg-background border-2 border-border shadow-sm p-6 flex flex-col items-center justify-center space-y-4 text-center h-full">
              {isProcessing ? (
                <div className="animate-pulse text-muted-foreground font-medium flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Compressing...
                </div>
              ) : compressedFile ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-green-500 mb-2" />
                  <div>
                    <div className="text-2xl font-bold tracking-tight">
                      {formatBytes(compressedFile.size)}
                    </div>
                    <div className="text-sm font-medium text-green-600 mt-1 pb-4">
                      {Math.round(
                        (1 - compressedFile.size / originalFile.size) * 100,
                      )}
                      % smaller
                    </div>
                  </div>
                  <Button
                    onClick={downloadCompressed}
                    className="w-full gap-2 rounded-full mt-auto"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
      />
    </div>
  );
}
