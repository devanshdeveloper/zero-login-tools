import { PDFDocument } from "pdf-lib";

export type PdfBytes = Uint8Array;

async function readFileBytes(file: File): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}

export function pdfBytesToBlob(bytes: PdfBytes): Blob {
  // TS: BlobPart expects ArrayBuffer (not ArrayBufferLike). Create a safe slice.
  const ab = (bytes.buffer as ArrayBuffer).slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  );
  return new Blob([ab], { type: "application/pdf" });
}

export async function mergePdfs(files: File[]): Promise<PdfBytes> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const srcBytes = await readFileBytes(file);
    const src = await PDFDocument.load(srcBytes);
    const pages = await merged.copyPages(src, src.getPageIndices());
    for (const p of pages) merged.addPage(p);
  }
  return await merged.save();
}

export async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await readFileBytes(file);
  const src = await PDFDocument.load(bytes);
  return src.getPageCount();
}

export async function extractPdfPageRange(
  file: File,
  startPage: number,
  endPage: number,
): Promise<PdfBytes> {
  const bytes = await readFileBytes(file);
  const src = await PDFDocument.load(bytes);
  const pageCount = src.getPageCount();

  const start = Math.max(1, Math.min(pageCount, startPage));
  const end = Math.max(1, Math.min(pageCount, endPage));
  const from = Math.min(start, end);
  const to = Math.max(start, end);

  const out = await PDFDocument.create();
  const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
  const pages = await out.copyPages(src, indices);
  pages.forEach((p) => out.addPage(p));
  return await out.save();
}

export async function splitPdfToSinglePages(
  file: File,
): Promise<{ pageNumber: number; bytes: PdfBytes }[]> {
  const bytes = await readFileBytes(file);
  const src = await PDFDocument.load(bytes);
  const pageCount = src.getPageCount();

  const outputs: { pageNumber: number; bytes: PdfBytes }[] = [];
  for (let i = 0; i < pageCount; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    outputs.push({ pageNumber: i + 1, bytes: await out.save() });
  }
  return outputs;
}

export async function optimizePdf(
  file: File,
  opts?: { stripMetadata?: boolean; useObjectStreams?: boolean },
): Promise<PdfBytes> {
  const bytes = await readFileBytes(file);
  const doc = await PDFDocument.load(bytes);

  if (opts?.stripMetadata) {
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setProducer("");
    doc.setCreator("");
    doc.setKeywords([]);
  }

  return await doc.save({
    useObjectStreams: opts?.useObjectStreams ?? true,
  });
}

export type PdfToImageResult = {
  pageNumber: number;
  blob: Blob;
  width: number;
  height: number;
};

let pdfJsWorkerConfigured = false;

async function getPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfJsWorkerConfigured) {
    try {
      // ESM worker (pdfjs-dist v5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pdfjs as any).GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
    } catch {
      // If this fails, pdf.js may fall back to a non-worker mode in some environments.
    } finally {
      pdfJsWorkerConfigured = true;
    }
  }
  return pdfjs;
}

export async function renderPdfPageToPng(
  file: File,
  pageNumber: number,
  scale: number = 1.5,
): Promise<PdfToImageResult> {
  const pdfjs = await getPdfJs();
  const bytes = await file.arrayBuffer();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadingTask = (pdfjs as any).getDocument({ data: bytes });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdf = (await loadingTask.promise) as any;
  const pageCount = pdf.numPages as number;
  const pageNum = Math.max(1, Math.min(pageCount, pageNumber));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = (await pdf.getPage(pageNum)) as any;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({ canvasContext: ctx, viewport }).promise;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png");
  });

  return {
    pageNumber: pageNum,
    blob,
    width: canvas.width,
    height: canvas.height,
  };
}

export async function imagesToPdf(
  imageFiles: File[],
  opts?: { margin?: number },
): Promise<PdfBytes> {
  const margin = Math.max(0, Math.min(72, opts?.margin ?? 12));
  const pdf = await PDFDocument.create();

  for (const f of imageFiles) {
    const bytes = await readFileBytes(f);
    const isPng = f.type === "image/png" || f.name.toLowerCase().endsWith(".png");
    const embedded = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);

    const imgW = embedded.width;
    const imgH = embedded.height;
    const page = pdf.addPage([imgW + margin * 2, imgH + margin * 2]);
    page.drawImage(embedded, { x: margin, y: margin, width: imgW, height: imgH });
  }

  return await pdf.save();
}

