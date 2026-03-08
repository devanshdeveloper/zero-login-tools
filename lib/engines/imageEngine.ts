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

// ——— Resize ———
export interface ResizeOptions {
  width?: number;
  height?: number;
  keepAspect?: boolean;
}

export async function resizeImage(
  file: File,
  options: ResizeOptions,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        const { width, height, keepAspect = true } = options;
        if (width && height) {
          if (keepAspect) {
            const scale = Math.min(width / w, height / h);
            w = Math.round(w * scale);
            h = Math.round(h * scale);
          } else {
            w = width;
            h = height;
          }
        } else if (width) {
          h = Math.round((h * width) / w);
          w = width;
        } else if (height) {
          w = Math.round((w * height) / h);
          h = height;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Blob failed"));
            const ext = file.name.split(".").pop() || "png";
            const name = file.name.replace(/\.[^/.]+$/, "") + `_${w}x${h}.${ext}`;
            resolve(new File([blob], name, { type: file.type, lastModified: Date.now() }));
          },
          file.type || "image/png",
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

// ——— Crop ———
export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function cropImage(file: File, rect: CropRect): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = rect.width;
        canvas.height = rect.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Blob failed"));
            const ext = file.name.split(".").pop() || "png";
            const name = file.name.replace(/\.[^/.]+$/, "") + `_crop.${ext}`;
            resolve(new File([blob], name, { type: file.type, lastModified: Date.now() }));
          },
          file.type || "image/png",
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

// ——— Rotate ———
export type RotateAngle = 90 | 180 | 270;

export async function rotateImage(file: File, angle: RotateAngle): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        if (angle === 90 || angle === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Blob failed"));
            const ext = file.name.split(".").pop() || "png";
            const name = file.name.replace(/\.[^/.]+$/, "") + `_rotated.${ext}`;
            resolve(new File([blob], name, { type: file.type, lastModified: Date.now() }));
          },
          file.type || "image/png",
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
