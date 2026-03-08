export function encodeBase64(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch {
    return "";
  }
}

export function decodeBase64(input: string): {
  success: boolean;
  value: string;
} {
  try {
    return { success: true, value: decodeURIComponent(escape(atob(input))) };
  } catch {
    return { success: false, value: "Error: Invalid Base64 string" };
  }
}
