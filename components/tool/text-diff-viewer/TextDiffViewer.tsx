"use client";

import { useState } from "react";
import { computeDiff, computeCharacterDiff } from "@/lib/engines/diffEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TextDiffViewer() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [result, setResult] = useState<ReturnType<typeof computeDiff> | null>(
    null
  );
  const [charDiff, setCharDiff] = useState<ReturnType<
    typeof computeCharacterDiff
  > | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCompare = () => {
    const diffResult = computeDiff(text1, text2);
    const charDiffResult = computeCharacterDiff(text1, text2);
    setResult(diffResult);
    setCharDiff(charDiffResult);
  };

  const handleCopy = () => {
    if (!result) return;
    const diffText = result.diffs
      .map((diff) => {
        if (diff.type === "added") {
          return `[+] ${diff.newLine}`;
        } else if (diff.type === "removed") {
          return `[-] ${diff.oldLine}`;
        } else if (diff.type === "modified") {
          return `[-] ${diff.oldLine}\n[+] ${diff.newLine}`;
        } else {
          return `[=] ${diff.oldLine}`;
        }
      })
      .join("\n");
    navigator.clipboard.writeText(diffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case "added":
        return "bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100";
      case "removed":
        return "bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100";
      case "modified":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center h-8">
            <h3 className="text-sm font-medium text-muted-foreground">
              Text 1
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setText1("");
                setResult(null);
                setCharDiff(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="First text to compare..."
            className="font-mono h-[400px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center h-8">
            <h3 className="text-sm font-medium text-muted-foreground">
              Text 2
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setText2("");
                setResult(null);
                setCharDiff(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Second text to compare..."
            className="font-mono h-[400px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button
          onClick={handleCompare}
          className="gap-2 transition-transform active:scale-95"
        >
          <FileText className="w-4 h-4" />
          Compare Texts
        </Button>
        {result && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied" : "Copy Diff"}
          </Button>
        )}
      </div>

      {result && charDiff && (
        <div className="space-y-4">
          <Alert className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
            <FileText className="h-4 w-4 !text-blue-600 dark:!text-blue-400" />
            <AlertTitle>Comparison Statistics</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <div>
                <div className="font-semibold mb-1">Line-level Changes:</div>
                <div className="flex gap-4 flex-wrap">
                  <Badge variant="secondary">
                    Added: {result.addedLines} lines
                  </Badge>
                  <Badge variant="secondary">
                    Removed: {result.removedLines} lines
                  </Badge>
                  <Badge variant="secondary">
                    Unchanged: {result.unchangedLines} lines
                  </Badge>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Character-level Changes:</div>
                <div className="flex gap-4 flex-wrap">
                  <Badge variant="secondary">
                    Added: {charDiff.added} chars
                  </Badge>
                  <Badge variant="secondary">
                    Removed: {charDiff.removed} chars
                  </Badge>
                  <Badge variant="secondary">
                    Unchanged: {charDiff.unchanged} chars
                  </Badge>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="side-by-side" className="w-full">
            <TabsList>
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="unified">Unified View</TabsTrigger>
            </TabsList>
            <TabsContent value="side-by-side" className="space-y-2">
              <div className="grid grid-cols-2 gap-4 border border-border rounded-md overflow-hidden max-h-[500px] overflow-y-auto">
                <div className="border-r border-border">
                  <div className="sticky top-0 bg-muted p-2 text-sm font-medium border-b border-border">
                    Text 1
                  </div>
                  <div className="divide-y divide-border">
                    {result.diffs.map((diff, idx) => (
                      <div
                        key={idx}
                        className={`p-2 font-mono text-sm ${getLineColor(
                          diff.type === "removed" || diff.type === "modified"
                            ? "removed"
                            : "unchanged"
                        )}`}
                      >
                        {diff.oldLine || diff.newLine || ""}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="sticky top-0 bg-muted p-2 text-sm font-medium border-b border-border">
                    Text 2
                  </div>
                  <div className="divide-y divide-border">
                    {result.diffs.map((diff, idx) => (
                      <div
                        key={idx}
                        className={`p-2 font-mono text-sm ${getLineColor(
                          diff.type === "added" || diff.type === "modified"
                            ? "added"
                            : "unchanged"
                        )}`}
                      >
                        {diff.newLine || diff.oldLine || ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="unified" className="space-y-2">
              <div className="border border-border rounded-md overflow-hidden max-h-[500px] overflow-y-auto">
                {result.diffs.map((diff, idx) => (
                  <div
                    key={idx}
                    className={`p-2 border-b border-border last:border-b-0 font-mono text-sm ${getLineColor(
                      diff.type
                    )}`}
                  >
                    <div className="flex items-start gap-2">
                      <Badge
                        variant={
                          diff.type === "added"
                            ? "default"
                            : diff.type === "removed"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs shrink-0"
                      >
                        {diff.type === "added"
                          ? "+"
                          : diff.type === "removed"
                            ? "-"
                            : diff.type === "modified"
                              ? "~"
                              : " "}
                      </Badge>
                      <span className="flex-1 break-words">
                        {diff.type === "added" && diff.newLine}
                        {diff.type === "removed" && diff.oldLine}
                        {diff.type === "modified" && (
                          <div className="space-y-1">
                            <div className="line-through">{diff.oldLine}</div>
                            <div>{diff.newLine}</div>
                          </div>
                        )}
                        {diff.type === "unchanged" && diff.oldLine}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
