"use client";

import { useState, useRef } from "react";
import { convertImageFormat, type OutputFormat } from "@/lib/engines/imageFormatEngine";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download } from "lucide-react";

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
];

export function ImageFormatConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>("image/png");
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

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const out = await convertImageFormat(file, format);
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to convert.");
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
          <p className="text-sm text-muted-foreground mt-1">Convert to PNG, JPEG, or WebP</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm text-muted-foreground">Convert to:</span>
            {FORMATS.map((f) => (
              <Button
                key={f.value}
                variant={format === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => { setFormat(f.value); setResult(null); }}
              >
                {f.label}
              </Button>
            ))}
          </div>
          <Button onClick={handleConvert} disabled={processing}>
            Convert
          </Button>
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
