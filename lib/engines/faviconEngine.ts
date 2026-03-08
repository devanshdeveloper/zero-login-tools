const FAVICON_SIZES = [16, 32, 48] as const;

export async function generateFavicons(file: File): Promise<{ size: number; blob: Blob }[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = async () => {
        const results: { size: number; blob: Blob }[] = [];
        for (const size of FAVICON_SIZES) {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("No canvas context"));
          ctx.drawImage(img, 0, 0, size, size);
          const blob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, "image/png"),
          );
          if (blob) results.push({ size, blob });
        }
        resolve(results);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

export function getFaviconSizes(): number[] {
  return [...FAVICON_SIZES];
}
