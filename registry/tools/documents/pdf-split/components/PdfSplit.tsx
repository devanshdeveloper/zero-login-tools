"use client";

import { useEffect, useRef, useState } from "react";
import {
  extractPdfPageRange,
  getPdfPageCount,
  pdfBytesToBlob,
  splitPdfToSinglePages,
} from "@/registry/engines/pdfEngine";
import { formatBytes } from "@/registry/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, FileText, RefreshCw, UploadCloud } from "lucide-react";

type SplitMode = "range" | "single-pages";

export function PdfSplit() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<SplitMode>("range");
  const [start, setStart] = useState("1");
  const [end, setEnd] = useState("1");
  const [isWorking, setIsWorking] = useState(false);
  const [rangeOut, setRangeOut] = useState<Blob | null>(null);
  const [pageOutputs, setPageOutputs] = useState<{ pageNumber: number; blob: Blob }[]>([]);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        const n = await getPdfPageCount(file);
        if (cancelled) return;
        setPageCount(n);
        setStart("1");
        setEnd(String(n));
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

  const onFile = (f: File | null) => {
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return;
    setFile(f);
    setRangeOut(null);
    setPageOutputs([]);
  };

  const run = async () => {
    if (!file) return;
    setIsWorking(true);
    setRangeOut(null);
    setPageOutputs([]);
    try {
      if (mode === "range") {
        const s = parseInt(start || "1", 10);
        const e = parseInt(end || "1", 10);
        const bytes = await extractPdfPageRange(file, s, e);
        setRangeOut(pdfBytesToBlob(bytes));
      } else {
        const outputs = await splitPdfToSinglePages(file);
        setPageOutputs(
          outputs.map((o: any) => ({
            pageNumber: o.pageNumber,
            blob: pdfBytesToBlob(o.bytes),
          })),
        );
      }
    } catch (e) {
      console.error(e);
      alert("Failed to split PDF.");
    } finally {
      setIsWorking(false);
    }
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPageCount(null);
    setRangeOut(null);
    setPageOutputs([]);
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
            Extract a page range or split into single-page PDFs
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

          <div className="border-2 border-border rounded-lg p-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="range"
                  checked={mode === "range"}
                  onChange={() => setMode("range")}
                />
                <span className="text-sm font-medium">Extract page range</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="single-pages"
                  checked={mode === "single-pages"}
                  onChange={() => setMode("single-pages")}
                />
                <span className="text-sm font-medium">Split into single pages</span>
              </label>
            </div>

            {mode === "range" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start page</Label>
                  <input
                    type="number"
                    min={1}
                    max={pageCount ?? undefined}
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                  />
                </div>
                <div>
                  <Label>End page</Label>
                  <input
                    type="number"
                    min={1}
                    max={pageCount ?? undefined}
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="w-full mt-1 rounded border-2 border-border px-3 py-2"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={run} disabled={isWorking} className="gap-2">
                {isWorking ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {mode === "range" ? "Extract PDF" : "Split PDF"}
              </Button>

              {rangeOut && (
                <Button
                  variant="secondary"
                  className="gap-2"
                  onClick={() => downloadBlob(rangeOut, "extracted.pdf")}
                >
                  <Download className="w-4 h-4" />
                  Download extracted.pdf ({formatBytes(rangeOut.size)})
                </Button>
              )}
            </div>
          </div>

          {pageOutputs.length > 0 && (
            <div className="border-2 border-border rounded-lg p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Split output ({pageOutputs.length} files). Download individually.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {pageOutputs.map((p) => (
                  <Button
                    key={p.pageNumber}
                    variant="outline"
                    className="justify-between"
                    onClick={() => downloadBlob(p.blob, `page-${p.pageNumber}.pdf`)}
                  >
                    <span>Page {p.pageNumber}</span>
                    <span className="text-xs text-muted-foreground">{formatBytes(p.blob.size)}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

