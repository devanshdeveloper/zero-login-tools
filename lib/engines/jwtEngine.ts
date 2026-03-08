export interface JwtData {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  isValid: boolean;
  error?: string;
}

export function decodeJwt(token: string): JwtData {
  if (!token)
    return { header: null, payload: null, signature: "", isValid: false };

  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      isValid: false,
      error: "Invalid JWT format. Expected 3 segments separated by dots.",
    };
  }

  try {
    const parseBase64Url = (str: string) => {
      let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    };

    return {
      header: parseBase64Url(parts[0]),
      payload: parseBase64Url(parts[1]),
      signature: parts[2],
      isValid: true,
    };
  } catch {
    return {
      header: null,
      payload: null,
      signature: parts[2] || "",
      isValid: false,
      error: "Failed to parse JWT payload. Invalid Base64 or JSON.",
    };
  }
}
