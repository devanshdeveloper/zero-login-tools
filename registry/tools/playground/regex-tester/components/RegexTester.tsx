"use client";

import { useMemo, useState } from "react";
import { testRegex } from "@/registry/engines/regexEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Copy, Check } from "lucide-react";

export function RegexTester() {
  const [pattern, setPattern] = useState(String.raw`(\w+)@(\w+\.\w+)`);
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Email: test@example.com\nEmail: a@b.co");
  const [replacement, setReplacement] = useState("$1 at $2");
  const [copied, setCopied] = useState(false);

  const res = useMemo(() => testRegex(pattern, text, flags), [pattern, text, flags]);

  const replaced = useMemo(() => {
    if (!pattern) return "";
    try {
      const re = new RegExp(pattern, flags);
      return text.replace(re, replacement);
    } catch {
      return "";
    }
  }, [pattern, flags, text, replacement]);

  const copyReplaced = async () => {
    await navigator.clipboard.writeText(replaced);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-muted-foreground mb-2">Pattern</p>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern"
                className="font-mono"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Flags</p>
              <Input
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="gimuy"
                className="font-mono"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Test text</p>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="font-mono h-[260px] resize-none shadow-inner"
              spellCheck={false}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Replacement (optional)</p>
            <Input
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="$1 $2"
              className="font-mono"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-border rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium">Matches</p>
            {res.success ? (
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  {res.matches.length} match{res.matches.length === 1 ? "" : "es"}
                </p>
                <div className="max-h-[210px] overflow-auto border border-border rounded-md p-2 bg-muted/10 font-mono text-xs space-y-2">
                  {res.matches.length === 0 ? (
                    <div className="text-muted-foreground">No matches.</div>
                  ) : (
                    res.matches.map((m: any, i: any) => (
                      <div key={i}>
                        <div>
                          <span className="opacity-60">#{i + 1}</span> &quot;{m.match}&quot;{" "}
                          <span className="opacity-60">@ {m.index}</span>
                        </div>
                        {m.groups.length > 0 && (
                          <div className="opacity-80">
                            Groups: {m.groups.map((g: any, gi: any) => `[${gi + 1}:"${g}"]`).join(" ")}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Regex error</AlertTitle>
                <AlertDescription className="font-mono text-sm mt-2 break-all">
                  {res.error}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="border-2 border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Replace preview</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyReplaced}
                disabled={!replaced}
                className="h-7 text-xs"
              >
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Textarea
              value={replaced}
              readOnly
              placeholder="Replacement output will appear here..."
              className="font-mono h-[220px] resize-none bg-muted/30"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

