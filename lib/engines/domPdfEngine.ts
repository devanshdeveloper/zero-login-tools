import { jsPDF } from "jspdf";

export type DomPdfOptions = {
  filename?: string;
  marginMm?: number;
  format?: "a4" | "letter";
};

export async function htmlElementToPdfBlob(
  el: HTMLElement,
  opts?: DomPdfOptions,
): Promise<Blob> {
  const doc = new jsPDF({
    unit: "mm",
    format: opts?.format ?? "a4",
  });

  const margin = Math.max(0, Math.min(25, opts?.marginMm ?? 10));

  // jsPDF's html() uses html2canvas under the hood (already in deps).
  await doc.html(el, {
    x: margin,
    y: margin,
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    windowWidth: el.scrollWidth || undefined,
  });

  return doc.output("blob");
}

