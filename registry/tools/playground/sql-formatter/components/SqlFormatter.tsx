"use client";

import { useMemo, useState } from "react";
import { formatSql } from "@/registry/engines/sqlEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";

export function SqlFormatter() {
  const [input, setInput] = useState("select id, name from users where active = true order by created_at desc;");
  const [language, setLanguage] = useState<"sql" | "postgresql" | "mysql" | "sqlite" | "tsql">("sql");
  const [copied, setCopied] = useState(false);

  const res = useMemo(() => formatSql(input, { language }), [input, language]);

  const copy = async () => {
    await navigator.clipboard.writeText(res.success ? res.value : res.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-muted-foreground">
          Dialect{" "}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            className="ml-2 rounded border-2 border-border px-2 py-1 bg-background"
          >
            <option value="sql">SQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="sqlite">SQLite</option>
            <option value="tsql">T-SQL</option>
          </select>
        </label>
        <Button variant="outline" size="sm" onClick={copy} className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy output"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Input SQL</h3>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono h-[420px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Formatted SQL</h3>
            {!res.success && <span className="text-xs text-red-600 dark:text-red-400 pr-2">Parse error</span>}
          </div>
          <Textarea
            value={res.value}
            readOnly
            className="font-mono h-[420px] resize-none bg-muted/30"
            spellCheck={false}
          />
          {!res.success && (
            <p className="text-xs text-red-600 dark:text-red-400 font-mono break-all">{res.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

