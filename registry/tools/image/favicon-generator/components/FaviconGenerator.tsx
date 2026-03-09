"use client";

import { useState, useRef } from "react";
import { generateFavicons } from "@/registry/tools/image/favicon-generator/engine";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download } from "lucide-react";

export function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [favicons, setFavicons] = useState<{ size: number; blob: Blob }[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f?.type.startsWith("image/")) return;
    setFile(f);
    setLoading(true);
    try {
      const result = await generateFavicons(f);
      setFavicons(result);
    } catch (e) {
      console.error(e);
      setFavicons([]);
    } finally {
      setLoading(false);
    }
  };

  const download = (size: number, blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `favicon-${size}x${size}.png`;
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
          <p className="text-sm text-muted-foreground mt-1">Generate 16×16, 32×32, 48×48 favicons</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          {loading && <p className="text-sm text-muted-foreground">Generating favicons…</p>}
          {favicons.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {favicons.map(({ size, blob }) => (
                <div key={size} className="flex flex-col items-center gap-2 border-2 border-border rounded-lg p-4">
                  <img
                    src={URL.createObjectURL(blob)}
                    alt={`${size}x${size}`}
                    width={size * 2}
                    height={size * 2}
                    className="border border-border rounded"
                  />
                  <p className="text-sm font-mono">{size}×{size}</p>
                  <Button variant="outline" size="sm" onClick={() => download(size, blob)}>
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
