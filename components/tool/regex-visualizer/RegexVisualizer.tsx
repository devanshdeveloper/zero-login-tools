"use client";

import { useState } from "react";
import { testRegex, validateRegex, RegexMatch } from "@/lib/engines/regexEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Copy, AlertCircle, Regex } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RegexVisualizer() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState("g");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof testRegex> | null>(null);

  const handleTest = () => {
    const validation = validateRegex(pattern);
    if (!validation.valid) {
      setResult({
        success: false,
        matches: [],
        error: validation.error,
        testString,
        regex: pattern,
        flags,
      });
      return;
    }

    const testResult = testRegex(pattern, testString, flags);
    setResult(testResult);
  };

  const handleCopy = () => {
    if (!result || !result.success) return;
    const output = result.matches
      .map((m, i) => `Match ${i + 1}: "${m.match}" at index ${m.index}`)
      .join("\n");
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFlag = (flag: string) => {
    const newFlags = flags.includes(flag)
      ? flags.replace(flag, "")
      : flags + flag;
    setFlags(newFlags);
  };

  const highlightMatches = (text: string, matches: RegexMatch[]): Array<{ text: string; isMatch: boolean; index: number }> => {
    if (!matches || matches.length === 0) return [{ text, isMatch: false, index: 0 }];

    const parts: Array<{ text: string; isMatch: boolean; index: number }> = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({
          text: text.slice(lastIndex, match.index),
          isMatch: false,
          index: lastIndex,
        });
      }
      parts.push({
        text: match.match,
        isMatch: true,
        index: match.index,
      });
      lastIndex = match.index + match.match.length;
    });

    if (lastIndex < text.length) {
      parts.push({
        text: text.slice(lastIndex),
        isMatch: false,
        index: lastIndex,
      });
    }

    return parts;
  };

  const highlightedParts = result?.success
    ? highlightMatches(testString, result.matches)
    : [];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pattern">Regular Expression Pattern</Label>
          <div className="flex gap-2">
            <Input
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="/example|pattern/"
              className="font-mono"
            />
            <Button onClick={handleTest} className="gap-2">
              <Regex className="w-4 h-4" />
              Test
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Flags</Label>
          <div className="flex gap-2 flex-wrap">
            {["g", "i", "m", "s", "u", "y"].map((flag) => (
              <Button
                key={flag}
                variant={flags.includes(flag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFlag(flag)}
                className="w-10"
              >
                {flag}
              </Button>
            ))}
            <span className="text-sm text-muted-foreground self-center">
              {flags || "(none)"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testString">Test String</Label>
          <Textarea
            id="testString"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex pattern..."
            className="font-mono min-h-[200px]"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          {result.success ? (
            <>
              <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                <Check className="h-4 w-4 !text-green-600 dark:!text-green-400" />
                <AlertTitle>
                  {result.matches.length} match{result.matches.length !== 1 ? "es" : ""} found
                </AlertTitle>
              </Alert>

              {result.matches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Matches</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      disabled={result.matches.length === 0}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {result.matches.map((match, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted rounded-md border border-border"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">Match {idx + 1}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Index: {match.index}
                          </span>
                        </div>
                        <div className="font-mono text-sm break-all">
                          {match.match}
                        </div>
                        {match.groups.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <div className="text-xs text-muted-foreground">
                              Groups:
                            </div>
                            {match.groups.map((group, gIdx) => (
                              <div
                                key={gIdx}
                                className="text-xs font-mono bg-background p-1 rounded"
                              >
                                Group {gIdx + 1}: {group || "(empty)"}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Highlighted Text</Label>
                <div className="p-4 bg-muted rounded-md border border-border min-h-[100px] font-mono text-sm whitespace-pre-wrap break-words">
                  {highlightedParts.length > 0 ? (
                    highlightedParts.map((part, idx) => (
                      <span
                        key={idx}
                        className={part.isMatch ? "bg-yellow-300 dark:bg-yellow-900/50 font-semibold" : ""}
                      >
                        {part.text}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">
                      {testString || "No text to highlight"}
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Regex Pattern</AlertTitle>
              <AlertDescription className="font-mono text-sm mt-2">
                {result.error}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
