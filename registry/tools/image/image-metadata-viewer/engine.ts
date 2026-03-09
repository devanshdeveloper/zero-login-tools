export interface ImageMetadata {
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export async function getImageMetadata(file: File): Promise<ImageMetadata> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
        const g = gcd(w, h);
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          width: w,
          height: h,
          aspectRatio: `${w / g}:${h / g}`,
        });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
