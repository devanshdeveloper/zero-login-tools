"use client";

import { useMemo, useState } from "react";
import { loadPyodideOnce, runPython } from "@/lib/engines/pyodideEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Play, RefreshCw } from "lucide-react";

const starter = `# Python (runs in your browser via Pyodide)
name = "ZeroLoginTools"
nums = [1, 2, 3]
print("Hello,", name)
print("Sum:", sum(nums))`;

export function PythonVisualizer() {
  const [code, setCode] = useState(starter);
  const [stdout, setStdout] = useState("");
  const [globals, setGlobals] = useState<Record<string, unknown>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const globalsJson = useMemo(() => {
    try {
      return JSON.stringify(globals, null, 2);
    } catch {
      return "{}";
    }
  }, [globals]);

  const ensureLoaded = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loadPyodideOnce();
    } catch (e) {
      console.error(e);
      setError("Failed to load Pyodide. Check your network connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const run = async () => {
    setIsRunning(true);
    setError(null);
    setStdout("");
    setGlobals({});
    try {
      const res = await runPython(code);
      if (res.success) {
        setStdout(res.stdout || "");
        setGlobals(res.globals || {});
      } else {
        setStdout(res.stdout || "");
        setError(res.error);
      }
    } catch (e) {
      console.error(e);
      setError("Python execution failed.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={ensureLoaded} variant="outline" disabled={isLoading} className="gap-2">
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
          Load Python runtime
        </Button>
        <Button onClick={run} disabled={isRunning || isLoading} className="gap-2">
          {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          Run
        </Button>
        <p className="text-xs text-muted-foreground">
          Runs client-side (Pyodide). No server execution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">Python code</h3>
            <Button variant="ghost" size="sm" onClick={() => setCode("")}>
              Clear
            </Button>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono h-[420px] resize-none shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
              <h3 className="text-sm font-medium text-muted-foreground pl-2">Stdout</h3>
            </div>
            <pre className="border-2 border-border rounded-lg p-4 bg-muted/10 h-[180px] overflow-auto text-xs whitespace-pre-wrap">
              {stdout || "Run your code to see output here."}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
              <h3 className="text-sm font-medium text-muted-foreground pl-2">Globals (best effort)</h3>
            </div>
            <pre className="border-2 border-border rounded-lg p-4 bg-muted/10 h-[220px] overflow-auto text-xs whitespace-pre-wrap">
              {globalsJson}
            </pre>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Python error</AlertTitle>
          <AlertDescription className="font-mono text-sm mt-2 break-all">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

