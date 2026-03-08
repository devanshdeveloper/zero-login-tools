"use client";

import { useRef, useState } from "react";
import { optimizePdf, pdfBytesToBlob } from "@/lib/engines/pdfEngine";
import { formatBytes } from "@/lib/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, FileText, RefreshCw, UploadCloud } from "lucide-react";

export function PdfCompress() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [useObjectStreams, setUseObjectStreams] = useState(true);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  const onFile = (f: File | null) => {
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return;
    setFile(f);
    setOutBlob(null);
  };

  const run = async () => {
    if (!file) return;
    setIsWorking(true);
    setOutBlob(null);
    try {
      const bytes = await optimizePdf(file, { stripMetadata, useObjectStreams });
      setOutBlob(pdfBytesToBlob(bytes));
    } catch (e) {
      console.error(e);
      alert("Failed to optimize PDF.");
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!outBlob) return;
    const url = URL.createObjectURL(outBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setOutBlob(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const savings =
    file && outBlob ? Math.round(((file.size - outBlob.size) / file.size) * 100) : null;

  return (
    <div className="p-6 space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border p-12 text-center cursor-pointer hover:bg-muted/20 rounded-lg"
        >
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="font-medium">Click to upload a PDF</p>
          <p className="text-sm text-muted-foreground mt-1">
            Client-side optimization (re-save + metadata stripping)
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  Input size: {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                Change
              </Button>
              <Button variant="ghost" size="sm" onClick={reset}>
                Clear
              </Button>
            </div>
          </div>

          <div className="border-2 border-border rounded-lg p-4 space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={stripMetadata}
                onChange={(e) => setStripMetadata(e.target.checked)}
              />
              <span className="text-sm">
                <Label>Strip metadata</Label>{" "}
                <span className="text-muted-foreground">(title, author, keywords)</span>
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useObjectStreams}
                onChange={(e) => setUseObjectStreams(e.target.checked)}
              />
              <span className="text-sm">
                <Label>Use object streams</Label>{" "}
                <span className="text-muted-foreground">(often reduces size)</span>
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button onClick={run} disabled={isWorking} className="gap-2">
                {isWorking ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                Optimize PDF
              </Button>
              {outBlob && (
                <Button onClick={download} variant="secondary" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download optimized.pdf ({formatBytes(outBlob.size)}
                  {savings !== null && isFinite(savings) ? ` • ${savings}%` : ""})
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Note: true &quot;compression&quot; (image downsampling) depends on the PDF contents and
              is limited in fully client-side tools.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

