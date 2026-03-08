export function encodeUrl(input: string): string {
  try {
    return encodeURIComponent(input);
  } catch {
    return "";
  }
}
export function decodeUrl(input: string): { success: boolean; value: string } {
  try {
    return { success: true, value: decodeURIComponent(input) };
  } catch {
    return { success: false, value: "Error: Malformed URI" };
  }
}
