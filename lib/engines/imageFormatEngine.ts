export type OutputFormat = "image/png" | "image/jpeg" | "image/webp";

const EXT_MAP: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function convertImageFormat(
  file: File,
  outputFormat: OutputFormat,
  quality = 0.92,
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
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Blob failed"));
            const ext = EXT_MAP[outputFormat] ?? "png";
            const name = file.name.replace(/\.[^/.]+$/, "") + "." + ext;
            resolve(new File([blob], name, { type: outputFormat, lastModified: Date.now() }));
          },
          outputFormat,
          outputFormat === "image/jpeg" || outputFormat === "image/webp" ? quality : undefined,
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
