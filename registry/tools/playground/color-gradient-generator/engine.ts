import { executeEngine, EngineExecutionResult } from "@/registry/engines/core";
import { EngineContext } from "@/registry/types";

export interface Options {
  from: string;
  to: string;
  steps: number;
  angle: number;
}
export type Output = {
  css: string;
  stops: string[];
};

export async function runEngine(
  context: EngineContext<any, Options>,
): Promise<EngineExecutionResult<Output>> {
  return executeEngine(context, async (ctx) => {
    const { from, to, steps, angle } = ctx.options || {};
    const res = generateGradientStops(
      from || "#000000",
      to || "#ffffff",
      steps || 8,
    );
    if (!res.success || !res.stops) {
      throw new Error("Failed to generate stops");
    }
    const css = buildLinearGradientCss(res.stops, angle || 90);
    return { css, stops: res.stops };
  });
}

export function generateGradientStops(
  from: string,
  to: string,
  steps: number,
): { success: true; stops: string[] } | { success: false; error: string } {
  try {
    if (steps < 2) steps = 2;
    if (steps > 100) steps = 100;

    const parseHex = (hex: string) => {
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }
      if (hex.length !== 6) throw new Error("Invalid hex color");
      return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
      ];
    };

    const c1 = parseHex(from);
    const c2 = parseHex(to);

    const stops: string[] = [];
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * ratio);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * ratio);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * ratio);
      const hex = `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
      stops.push(hex);
    }

    return { success: true, stops };
  } catch (err: any) {
    return { success: false, error: err.message || "Invalid input" };
  }
}

export function buildLinearGradientCss(stops: string[], angle: number): string {
  if (!stops || stops.length === 0) return "";
  return `linear-gradient(${angle}deg, ${stops.join(", ")})`;
}
