"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getPdfPageCount, renderPdfPageToPng } from "@/lib/engines/pdfEngine";
import { formatBytes } from "@/lib/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, FileText, RefreshCw, UploadCloud } from "lucide-react";

export function PdfToImage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [page, setPage] = useState("1");
  const [scale, setScale] = useState("1.5");
  const [result, setResult] = useState<{ blob: Blob; width: number; height: number; pageNumber: number } | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        const n = await getPdfPageCount(file);
        if (cancelled) return;
        setPageCount(n);
        setPage("1");
      } catch (e) {
        console.error(e);
        if (cancelled) return;
        setPageCount(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file]);

  const previewUrl = useMemo(() => {
    if (!result) return null;
    return URL.createObjectURL(result.blob);
  }, [result]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onFile = (f: File | null) => {
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return;
    setFile(f);
    setResult(null);
  };

  const run = async () => {
    if (!file) return;
    setIsWorking(true);
    setResult(null);
    try {
      const pageNum = parseInt(page || "1", 10);
      const sc = Math.max(0.5, Math.min(4, parseFloat(scale || "1.5")));
      const out = await renderPdfPageToPng(file, pageNum, sc);
      setResult(out);
    } catch (e) {
      console.error(e);
      alert("Failed to render PDF page.");
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${result.pageNumber}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPageCount(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

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
            Render a PDF page to a PNG image (client-side)
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
                  {formatBytes(file.size)}
                  {pageCount ? ` • ${pageCount} pages` : ""}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border-2 border-border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Page</Label>
                  <input
                    type="number"
                    min={1}
                    max={pageCount ?? undefined}
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                  />
                </div>
                <div>
                  <Label>Scale</Label>
                  <input
                    type="number"
                    min={0.5}
                    max={4}
                    step={0.1}
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={run} disabled={isWorking} className="gap-2">
                  {isWorking ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                  Render to PNG
                </Button>
                {result && (
                  <Button onClick={download} variant="secondary" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download PNG ({formatBytes(result.blob.size)})
                  </Button>
                )}
              </div>

              {result && (
                <p className="text-xs text-muted-foreground">
                  Output: {result.width}×{result.height}px
                </p>
              )}
            </div>

            <div className="border-2 border-border rounded-lg p-4 flex items-center justify-center bg-muted/20 min-h-[260px]">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Rendered PDF page preview"
                  className="max-w-full max-h-[420px] rounded border border-border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">Rendered image preview will appear here.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

