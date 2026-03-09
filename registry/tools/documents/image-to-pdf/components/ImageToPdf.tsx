"use client";

import { useMemo, useRef, useState } from "react";
import { imagesToPdf, pdfBytesToBlob } from "@/registry/engines/pdfEngine";
import { formatBytes } from "@/registry/engines/imageEngine";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, Download, ArrowUp, ArrowDown, X, RefreshCw, Image as ImageIcon } from "lucide-react";

type ImgItem = { id: string; file: File };

export function ImageToPdf() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<ImgItem[]>([]);
  const [margin, setMargin] = useState("12");
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  const totalSize = useMemo(
    () => items.reduce((sum, it) => sum + it.file.size, 0),
    [items],
  );

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next: ImgItem[] = [];
    Array.from(files).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
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

  const run = async () => {
    if (items.length === 0) return;
    setIsWorking(true);
    setOutBlob(null);
    try {
      const m = Math.max(0, Math.min(72, parseInt(margin || "12", 10)));
      const bytes = await imagesToPdf(items.map((x) => x.file), { margin: m });
      setOutBlob(pdfBytesToBlob(bytes));
    } catch (e) {
      console.error(e);
      alert("Failed to create PDF from images.");
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!outBlob) return;
    const url = URL.createObjectURL(outBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "images.pdf";
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
        accept="image/*"
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
          <p className="font-medium">Click to upload images</p>
          <p className="text-sm text-muted-foreground mt-1">PNG, JPEG, WebP (one PDF page per image)</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{items.length} images selected</p>
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
                  <Button variant="ghost" size="icon" onClick={() => remove(it.id)} aria-label="Remove">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-border rounded-lg p-4 space-y-4">
            <div className="max-w-xs">
              <Label>Page margin (pt)</Label>
              <input
                type="number"
                min={0}
                max={72}
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                className="w-full mt-1 rounded border-2 border-border px-3 py-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                12pt ≈ 0.17&quot;. Each page is sized to the image + margins.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={run} disabled={isWorking || items.length === 0} className="gap-2">
                {isWorking ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                Create PDF
              </Button>
              {outBlob && (
                <Button onClick={download} variant="secondary" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download images.pdf ({formatBytes(outBlob.size)})
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

