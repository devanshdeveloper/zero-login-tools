export interface RemoveBgOptions {
  targetR: number;
  targetG: number;
  targetB: number;
  tolerance: number; // 0–255
  replaceWithTransparent: boolean;
}

export async function removeBackground(
  file: File,
  options: RemoveBgOptions,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const { targetR, targetG, targetB, tolerance } = options;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]!;
          const g = data[i + 1]!;
          const b = data[i + 2]!;
          const dist =
            Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB);
          if (dist <= tolerance * 3) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Blob failed"));
            const name = file.name.replace(/\.[^/.]+$/, "") + "_nobg.png";
            resolve(new File([blob], name, { type: "image/png", lastModified: Date.now() }));
          },
          "image/png",
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
