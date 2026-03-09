export interface PaletteColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  count: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.round(x).toString(16).padStart(2, "0"))
      .join("")
  );
}

export async function extractPalette(
  file: File,
  maxColors = 8,
): Promise<PaletteColor[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, 100 / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const countMap = new Map<string, { r: number; g: number; b: number; count: number }>();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]!;
          const g = data[i + 1]!;
          const b = data[i + 2]!;
          const a = data[i + 3]!;
          if (a < 128) continue;
          const key = `${Math.round(r / 16) * 16},${Math.round(g / 16) * 16},${Math.round(b / 16) * 16}`;
          const existing = countMap.get(key);
          if (existing) {
            existing.count++;
          } else {
            countMap.set(key, { r, g, b, count: 1 });
          }
        }
        const sorted = [...countMap.entries()]
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, maxColors);
        resolve(
          sorted.map(([, v]) => ({
            hex: rgbToHex(v.r, v.g, v.b),
            rgb: { r: v.r, g: v.g, b: v.b },
            count: v.count,
          })),
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
