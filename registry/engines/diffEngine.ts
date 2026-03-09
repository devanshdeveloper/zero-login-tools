export interface DiffLine {
  type: "added" | "removed" | "unchanged" | "modified";
  oldLine?: string;
  newLine?: string;
  lineNumber?: number;
}

export interface DiffResult {
  success: boolean;
  diffs: DiffLine[];
  addedLines: number;
  removedLines: number;
  unchangedLines: number;
  totalChanges: number;
  error?: string;
}

export function computeDiff(oldText: string, newText: string): DiffResult {
  if (!oldText && !newText) {
    return {
      success: true,
      diffs: [],
      addedLines: 0,
      removedLines: 0,
      unchangedLines: 0,
      totalChanges: 0,
    };
  }

  try {
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");
    const diffs: DiffLine[] = [];

    // Simple line-by-line diff algorithm
    const maxLen = Math.max(oldLines.length, newLines.length);
    let addedCount = 0;
    let removedCount = 0;
    let unchangedCount = 0;

    for (let i = 0; i < maxLen; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine === undefined && newLine !== undefined) {
        // Line added
        diffs.push({
          type: "added",
          newLine,
          lineNumber: i + 1,
        });
        addedCount++;
      } else if (oldLine !== undefined && newLine === undefined) {
        // Line removed
        diffs.push({
          type: "removed",
          oldLine,
          lineNumber: i + 1,
        });
        removedCount++;
      } else if (oldLine === newLine) {
        // Line unchanged
        diffs.push({
          type: "unchanged",
          oldLine,
          newLine,
          lineNumber: i + 1,
        });
        unchangedCount++;
      } else {
        // Line modified
        diffs.push({
          type: "modified",
          oldLine,
          newLine,
          lineNumber: i + 1,
        });
        addedCount++;
        removedCount++;
      }
    }

    return {
      success: true,
      diffs,
      addedLines: addedCount,
      removedLines: removedCount,
      unchangedLines: unchangedCount,
      totalChanges: addedCount + removedCount,
    };
  } catch (err: unknown) {
    return {
      success: false,
      diffs: [],
      addedLines: 0,
      removedLines: 0,
      unchangedLines: 0,
      totalChanges: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function computeCharacterDiff(oldText: string, newText: string): {
  added: number;
  removed: number;
  unchanged: number;
} {
  // Simple character-level comparison
  const oldLen = oldText.length;
  const newLen = newText.length;
  const minLen = Math.min(oldLen, newLen);

  let unchanged = 0;
  for (let i = 0; i < minLen; i++) {
    if (oldText[i] === newText[i]) {
      unchanged++;
    }
  }

  return {
    added: Math.max(0, newLen - oldLen),
    removed: Math.max(0, oldLen - newLen),
    unchanged,
  };
}
