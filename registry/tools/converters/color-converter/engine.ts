import { executeEngine, EngineExecutionResult } from "@/registry/engines/core";
import { EngineContext } from "@/registry/types";

export interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  isValid: boolean;
}

export function parseHex(
  hex: string,
): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function convertColor(input: string): ColorData {
  const empty = { hex: "", rgb: "", hsl: "", isValid: false };
  if (!input) return empty;

  const val = input.trim().toLowerCase();

  // Try HEX
  const rgbFromHex = parseHex(val);
  if (rgbFromHex) {
    const hsl = rgbToHsl(rgbFromHex.r, rgbFromHex.g, rgbFromHex.b);
    return {
      hex: rgbToHex(rgbFromHex.r, rgbFromHex.g, rgbFromHex.b),
      rgb: `rgb(${rgbFromHex.r}, ${rgbFromHex.g}, ${rgbFromHex.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      isValid: true,
    };
  }

  // Try parsing rgb(...) string
  if (val.startsWith("rgb")) {
    const match = val.match(/\d+/g);
    if (match && match.length >= 3) {
      const r = Math.min(255, Math.max(0, parseInt(match[0])));
      const g = Math.min(255, Math.max(0, parseInt(match[1])));
      const b = Math.min(255, Math.max(0, parseInt(match[2])));
      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);
      return {
        hex,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        isValid: true,
      };
    }
  }

  return empty;
}

export interface Options {}
export type Output = ColorData;

export async function runEngine(
  context: EngineContext<string, Options>,
): Promise<EngineExecutionResult<Output>> {
  return executeEngine(context, async (ctx) => {
    return convertColor(ctx.input);
  });
}
