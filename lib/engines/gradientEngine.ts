import { parseHex, rgbToHex } from "@/lib/engines/colorEngine";

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function generateGradientStops(
  fromHex: string,
  toHex: string,
  steps: number,
): { success: true; stops: string[] } | { success: false; error: string; stops: string[] } {
  const from = parseHex(fromHex);
  const to = parseHex(toHex);
  const n = Math.max(2, Math.min(50, Math.floor(steps || 2)));
  if (!from || !to) {
    return { success: false, error: "Invalid HEX colors.", stops: [] };
  }

  const stops: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    const r = Math.round(lerp(from.r, to.r, t));
    const g = Math.round(lerp(from.g, to.g, t));
    const b = Math.round(lerp(from.b, to.b, t));
    stops.push(rgbToHex(r, g, b));
  }
  return { success: true, stops };
}

export function buildLinearGradientCss(
  stops: string[],
  angleDeg: number,
): string {
  const angle = ((angleDeg % 360) + 360) % 360;
  const parts = stops.map((c, i) => {
    const pct = stops.length <= 1 ? 0 : Math.round((i / (stops.length - 1)) * 100);
    return `${c} ${pct}%`;
  });
  return `linear-gradient(${angle}deg, ${parts.join(", ")})`;
}

