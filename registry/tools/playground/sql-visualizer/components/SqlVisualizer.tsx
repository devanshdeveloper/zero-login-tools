"use client";

import { useMemo, useState } from "react";
import { parseSqlToAst } from "@/registry/engines/sqlEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";

export function SqlVisualizer() {
  const [input, setInput] = useState("SELECT u.id, u.email FROM users u WHERE u.active = true ORDER BY u.created_at DESC;");
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseSqlToAst(input), [input]);
  const astText = useMemo(() => {
    if (!parsed.success) return "";
    try {
      return JSON.stringify(parsed.ast, null, 2);
    } catch {
      return String(parsed.ast);
    }
  }, [parsed]);

  const copy = async () => {
    await navigator.clipboard.writeText(astText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">SQL input</h3>
            <Button variant="ghost" size="sm" onClick={() => setInput("")}>
              Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono h-[420px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">AST (JSON)</h3>
            <Button variant="ghost" size="sm" onClick={copy} disabled={!astText} className="h-7 text-xs">
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={parsed.success ? astText : ""}
            readOnly
            className="font-mono h-[420px] resize-none bg-muted/30"
            spellCheck={false}
            placeholder="Parsed AST will appear here..."
          />
          {!parsed.success && (
            <p className="text-xs text-red-600 dark:text-red-400 font-mono break-all">{parsed.error}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        This visualizer parses SQL into an abstract syntax tree (AST). Complex vendor-specific syntax may not parse.
      </p>
    </div>
  );
}

