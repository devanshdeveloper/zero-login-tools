import { executeEngine, EngineExecutionResult } from "@/registry/engines/core";
import { EngineContext } from "@/registry/types";

export interface Options {}
export type Output = any;

export async function runEngine(
  context: EngineContext<any, Options>,
): Promise<EngineExecutionResult<Output>> {
  return executeEngine(context, async (ctx) => {
    ctx.callback({
      status: "running",
      progress: 50,
      message: "Processing...",
    });
    // Implementation logic here
    return ctx.input;
  });
}

export function computeCharacterDiff(text1: string, text2: string) {
  let unchanged = 0;
  const minLen = Math.min(text1.length, text2.length);
  for (let i = 0; i < minLen; i++) {
    if (text1[i] === text2[i]) unchanged++;
  }
  return {
    added: text2.length - unchanged,
    removed: text1.length - unchanged,
    unchanged,
  };
}

export function computeDiff(text1: string, text2: string) {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const diffs: any[] = [];
  let addedLines = 0;
  let removedLines = 0;
  let unchangedLines = 0;

  let i = 0;
  let j = 0;

  while (i < lines1.length || j < lines2.length) {
    if (i < lines1.length && j < lines2.length && lines1[i] === lines2[j]) {
      diffs.push({ type: "unchanged", oldLine: lines1[i] });
      unchangedLines++;
      i++;
      j++;
    } else if (i < lines1.length && j < lines2.length) {
      let synced = false;
      for (let k = 1; k < 5; k++) {
        if (i + k < lines1.length && lines1[i + k] === lines2[j]) {
          for (let m = 0; m < k; m++) {
            diffs.push({ type: "removed", oldLine: lines1[i + m] });
            removedLines++;
          }
          i += k;
          synced = true;
          break;
        }
        if (j + k < lines2.length && lines1[i] === lines2[j + k]) {
          for (let m = 0; m < k; m++) {
            diffs.push({ type: "added", newLine: lines2[j + m] });
            addedLines++;
          }
          j += k;
          synced = true;
          break;
        }
      }
      if (!synced) {
        diffs.push({
          type: "modified",
          oldLine: lines1[i],
          newLine: lines2[j],
        });
        removedLines++;
        addedLines++;
        i++;
        j++;
      }
    } else if (i < lines1.length) {
      diffs.push({ type: "removed", oldLine: lines1[i] });
      removedLines++;
      i++;
    } else if (j < lines2.length) {
      diffs.push({ type: "added", newLine: lines2[j] });
      addedLines++;
      j++;
    }
  }

  return { diffs, addedLines, removedLines, unchangedLines };
}
