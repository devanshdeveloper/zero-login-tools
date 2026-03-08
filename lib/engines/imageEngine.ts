export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality: number; // 0.1 to 1.0
  format: "image/jpeg" | "image/webp";
}

export async function compressImage(
  file: File,
  options: CompressOptions,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (options.maxWidth && width > options.maxWidth) {
          height = Math.round((height * options.maxWidth) / width);
          width = options.maxWidth;
        }
        if (options.maxHeight && height > options.maxHeight) {
          width = Math.round((width * options.maxHeight) / height);
          height = options.maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Failed to get canvas context"));

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Failed to compress image"));

            const formatExtMap: Record<string, string> = {
              "image/jpeg": "jpg",
              "image/webp": "webp",
            };
            const ext = formatExtMap[options.format] || "img";

            let cleanName = file.name.replace(/\.[^/.]+$/, "");
            // Prevent double extension if user uploads repeatedly
            if (cleanName.endsWith("_compressed")) {
              cleanName = cleanName.substring(0, cleanName.length - 11);
            }

            const newFile = new File([blob], `${cleanName}_compressed.${ext}`, {
              type: options.format,
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          options.format,
          options.quality,
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
