"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildJsRunnerSrcDoc, type JsRunnerMessage } from "@/lib/engines/sandboxEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Trash2 } from "lucide-react";

type LogItem = { level: "log" | "info" | "warn" | "error"; text: string };

const starter = `console.log("Hello!");
console.info({ now: new Date().toISOString() });
console.warn("This is a warning");
console.error("This is an error");`;

export function JsConsoleRunner() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState(starter);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [runId, setRunId] = useState(0);

  const srcDoc = useMemo(
    () => buildJsRunnerSrcDoc(`${code}\n\n// __run_id:${runId}`),
    [code, runId],
  );

  useEffect(() => {
    const handler = (ev: MessageEvent) => {
      const iframeWin = iframeRef.current?.contentWindow;
      if (!iframeWin || ev.source !== iframeWin) return;
      const msg = ev.data as JsRunnerMessage;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "log") {
        setLogs((prev) => [
          ...prev,
          { level: msg.level, text: msg.args.join(" ") },
        ]);
      }
      if (msg.type === "runtime-error") {
        setLogs((prev) => [...prev, { level: "error", text: msg.error }]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const run = () => {
    setLogs([]);
    setRunId((x) => x + 1);
  };

  const clear = () => setLogs([]);

  const colorFor = (lvl: LogItem["level"]) => {
    if (lvl === "error") return "text-red-600 dark:text-red-400";
    if (lvl === "warn") return "text-amber-700 dark:text-amber-400";
    if (lvl === "info") return "text-blue-700 dark:text-blue-400";
    return "text-foreground";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">JavaScript</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={run} className="gap-2">
                <Play className="w-4 h-4" />
                Run
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCode("")}>
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono h-[420px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">Console output</h3>
            <Button variant="ghost" size="sm" onClick={clear} className="h-7 text-xs">
              <Trash2 className="w-3 h-3 mr-1" />
              Clear
            </Button>
          </div>
          <div className="border-2 border-border rounded-lg p-4 bg-muted/10 h-[420px] overflow-auto font-mono text-xs space-y-2">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">Run your code to see console output here.</p>
            ) : (
              logs.map((l, idx) => (
                <div key={idx} className={colorFor(l.level)}>
                  <span className="opacity-60 mr-2">[{l.level}]</span>
                  <span className="whitespace-pre-wrap break-words">{l.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hidden sandbox that executes the code */}
      <iframe
        ref={iframeRef}
        title="js-runner"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="hidden"
      />
    </div>
  );
}

