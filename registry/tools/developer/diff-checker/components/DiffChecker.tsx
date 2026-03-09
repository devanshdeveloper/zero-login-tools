"use client";

import { useState } from "react";
import { computeDiff } from "@/registry/engines/diffEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, GitCompare } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function DiffChecker() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof computeDiff> | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const handleCompare = () => {
    const diffResult = computeDiff(oldText, newText);
    setResult(diffResult);
  };

  const handleCopy = () => {
    if (!result) return;
    const diffText = result.diffs
      .map((diff: any) => {
        if (diff.type === "added") {
          return `+ ${diff.newLine}`;
        } else if (diff.type === "removed") {
          return `- ${diff.oldLine}`;
        } else if (diff.type === "modified") {
          return `- ${diff.oldLine}\n+ ${diff.newLine}`;
        } else {
          return `  ${diff.oldLine}`;
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
        return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800";
      case "removed":
        return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800";
      case "modified":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-800";
      default:
        return "bg-muted border-border";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center h-8">
            <h3 className="text-sm font-medium text-muted-foreground">
              Original Text
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setOldText("");
                setResult(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Original version..."
            className="font-mono h-[400px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center h-8">
            <h3 className="text-sm font-medium text-muted-foreground">
              New Text
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setNewText("");
                setResult(null);
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="New version..."
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
          <GitCompare className="w-4 h-4" />
          Compare
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

      {result && (
        <div className="space-y-4">
          <Alert className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
            <GitCompare className="h-4 w-4 !text-blue-600 dark:!text-blue-400" />
            <AlertTitle>Diff Statistics</AlertTitle>
            <AlertDescription className="mt-2 space-y-1">
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
                <Badge variant="secondary">
                  Total Changes: {result.totalChanges}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Diff View</h3>
            <div className="border border-border rounded-md overflow-hidden max-h-[500px] overflow-y-auto">
              {result.diffs.map((diff: any, idx: any) => (
                <div
                  key={idx}
                  className={`p-2 border-b border-border last:border-b-0 ${getLineColor(
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
                    <span className="text-xs text-muted-foreground shrink-0 w-12">
                      {diff.lineNumber}
                    </span>
                    <div className="flex-1 font-mono text-sm break-words">
                      {diff.type === "added" && (
                        <span className="text-green-700 dark:text-green-300">
                          {diff.newLine}
                        </span>
                      )}
                      {diff.type === "removed" && (
                        <span className="text-red-700 dark:text-red-300 line-through">
                          {diff.oldLine}
                        </span>
                      )}
                      {diff.type === "modified" && (
                        <div className="space-y-1">
                          <div className="text-red-700 dark:text-red-300 line-through">
                            {diff.oldLine}
                          </div>
                          <div className="text-green-700 dark:text-green-300">
                            {diff.newLine}
                          </div>
                        </div>
                      )}
                      {diff.type === "unchanged" && (
                        <span className="text-foreground">{diff.oldLine}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
