"use client";

import { useState, useRef } from "react";
import { getImageMetadata } from "@/lib/engines/imageMetadataEngine";
import { formatBytes } from "@/lib/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileImage } from "lucide-react";

export function ImageMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Awaited<ReturnType<typeof getImageMetadata>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f?.type.startsWith("image/")) return;
    setFile(f);
    setError(null);
    try {
      const m = await getImageMetadata(f);
      setMeta(m);
    } catch {
      setError("Failed to read metadata.");
      setMeta(null);
    }
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
          <p className="text-sm text-muted-foreground mt-1">View dimensions, size, type</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          {meta && (
            <div className="border-2 border-border rounded-lg p-6 space-y-4 bg-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <FileImage className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Image metadata</h3>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">File name</dt>
                  <dd className="font-mono mt-0.5">{meta.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">File size</dt>
                  <dd className="font-mono mt-0.5">{formatBytes(meta.size)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">MIME type</dt>
                  <dd className="font-mono mt-0.5">{meta.type}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Dimensions</dt>
                  <dd className="font-mono mt-0.5">{meta.width} × {meta.height}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Aspect ratio</dt>
                  <dd className="font-mono mt-0.5">{meta.aspectRatio}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
