export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexResult {
  success: boolean;
  matches: RegexMatch[];
  error?: string;
  testString: string;
  regex: string;
  flags: string;
}

export function testRegex(
  pattern: string,
  testString: string,
  flags: string = "g"
): RegexResult {
  if (!pattern) {
    return {
      success: true,
      matches: [],
      testString,
      regex: pattern,
      flags,
    };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    let match;

    // Reset regex lastIndex for global flag
    if (flags.includes("g")) {
      regex.lastIndex = 0;
    }

    while ((match = regex.exec(testString)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1),
      });

      // Prevent infinite loop with zero-length matches
      if (match[0].length === 0) {
        regex.lastIndex++;
      }

      // If not global, break after first match
      if (!flags.includes("g")) {
        break;
      }
    }

    return {
      success: true,
      matches,
      testString,
      regex: pattern,
      flags,
    };
  } catch (err: unknown) {
    return {
      success: false,
      matches: [],
      error: err instanceof Error ? err.message : String(err),
      testString,
      regex: pattern,
      flags,
    };
  }
}

export function validateRegex(pattern: string): { valid: boolean; error?: string } {
  if (!pattern) {
    return { valid: true };
  }

  try {
    new RegExp(pattern);
    return { valid: true };
  } catch (err: unknown) {
    return {
      valid: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
