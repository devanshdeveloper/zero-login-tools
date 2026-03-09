"use client";

import { useMemo, useState } from "react";
import { parseHeaders, readResponseBody, safePrettyJson } from "@/registry/tools/playground/json-api-tester/engine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Send, RefreshCw } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function JsonApiTester() {
  const [method, setMethod] = useState<Method>("GET");
  const [url, setUrl] = useState("https://api.github.com");
  const [headersText, setHeadersText] = useState("accept: application/json");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [respStatus, setRespStatus] = useState<string>("");
  const [respHeaders, setRespHeaders] = useState<string>("");
  const [respBody, setRespBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const headersObj = useMemo(() => parseHeaders(headersText), [headersText]);

  const send = async () => {
    setIsSending(true);
    setError(null);
    setRespStatus("");
    setRespHeaders("");
    setRespBody("");
    try {
      const init: RequestInit = { method, headers: headersObj };
      if (method !== "GET" && method !== "DELETE" && body.trim()) {
        init.body = body;
      }
      const res = await fetch(url, init);
      setRespStatus(`${res.status} ${res.statusText}`);

      const headersLines: string[] = [];
      res.headers.forEach((v, k) => headersLines.push(`${k}: ${v}`));
      setRespHeaders(headersLines.join("\n"));

      const b = await readResponseBody(res);
      if (b.isJson) {
        const pretty = safePrettyJson(b.text);
        setRespBody(pretty.value);
      } else {
        setRespBody(b.text);
      }
    } catch (e) {
      console.error(e);
      setError(
        "Request failed. This is often caused by CORS restrictions when calling third‑party APIs directly from the browser.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as Method)}
              className="rounded border-2 border-border px-2 py-2 bg-background"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="font-mono"
            />
            <Button onClick={send} disabled={isSending || !url.trim()} className="gap-2">
              {isSending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </Button>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Headers (one per line)</p>
            <Textarea
              value={headersText}
              onChange={(e) => setHeadersText(e.target.value)}
              placeholder="authorization: Bearer ..."
              className="font-mono h-[140px] resize-none shadow-inner"
              spellCheck={false}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Body</p>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"hello":"world"}'
              className="font-mono h-[220px] resize-none shadow-inner"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-border rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium">Response</p>
            <div className="text-sm">
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="font-mono">{respStatus || "—"}</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Headers</p>
                <Textarea
                  value={respHeaders}
                  readOnly
                  className="font-mono h-[140px] resize-none bg-muted/30"
                  spellCheck={false}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Body</p>
                <Textarea
                  value={respBody}
                  readOnly
                  className="font-mono h-[220px] resize-none bg-muted/30"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Request error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

