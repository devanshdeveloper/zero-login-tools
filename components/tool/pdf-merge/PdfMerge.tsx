"use client";

import { useMemo, useRef, useState } from "react";
import { mergePdfs, pdfBytesToBlob } from "@/lib/engines/pdfEngine";
import { formatBytes } from "@/lib/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download, ArrowUp, ArrowDown, X, RefreshCw, FileText } from "lucide-react";

type PdfItem = { id: string; file: File };

export function PdfMerge() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<PdfItem[]>([]);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  const totalSize = useMemo(
    () => items.reduce((sum, it) => sum + it.file.size, 0),
    [items],
  );

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next: PdfItem[] = [];
    Array.from(files).forEach((f) => {
      const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) return;
      next.push({ id: crypto.randomUUID(), file: f });
    });
    if (next.length === 0) return;
    setItems((prev) => [...prev, ...next]);
    setOutBlob(null);
  };

  const move = (idx: number, dir: -1 | 1) => {
    setItems((prev) => {
      const next = prev.slice();
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      const tmp = next[idx];
      next[idx] = next[j];
      next[j] = tmp;
      return next;
    });
    setOutBlob(null);
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setOutBlob(null);
  };

  const merge = async () => {
    if (items.length < 2) return;
    setIsWorking(true);
    try {
      const bytes = await mergePdfs(items.map((x) => x.file));
      setOutBlob(pdfBytesToBlob(bytes));
    } catch (e) {
      console.error(e);
      alert("Failed to merge PDFs.");
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!outBlob) return;
    const url = URL.createObjectURL(outBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setItems([]);
    setOutBlob(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="p-6 space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {items.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border p-12 text-center cursor-pointer hover:bg-muted/20 rounded-lg"
        >
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="font-medium">Click to upload PDFs</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add 2 or more PDFs, then merge them in order
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{items.length} PDFs selected</p>
                <p className="text-sm text-muted-foreground">
                  Total input size: {formatBytes(totalSize)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                Add more
              </Button>
              <Button variant="ghost" size="sm" onClick={reset}>
                Clear
              </Button>
            </div>
          </div>

          <div className="border-2 border-border rounded-lg divide-y">
            {items.map((it, idx) => (
              <div key={it.id} className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium truncate">{it.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(it.file.size)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => move(idx, 1)}
                    disabled={idx === items.length - 1}
                    aria-label="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(it.id)}
                    aria-label="Remove"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button onClick={merge} disabled={items.length < 2 || isWorking} className="gap-2">
              {isWorking ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              Merge PDFs
            </Button>
            {outBlob && (
              <Button onClick={download} variant="secondary" className="gap-2">
                <Download className="w-4 h-4" />
                Download merged.pdf ({formatBytes(outBlob.size)})
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

