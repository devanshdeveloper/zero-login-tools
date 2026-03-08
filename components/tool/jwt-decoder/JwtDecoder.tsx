"use client";

import { useState } from "react";
import { decodeJwt, JwtData } from "@/lib/engines/jwtEngine";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ShieldCheck } from "lucide-react";

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<JwtData>(decodeJwt(""));

  const handleInput = (val: string) => {
    setInput(val);
    setData(decodeJwt(val));
  };

  const getFormatStr = (obj: any) => {
    if (!obj) return "";
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex justify-between">
          Encoded JWT
          <span className="text-xs text-muted-foreground/70">
            Algorithm, Payload, Signature
          </span>
        </label>
        <Textarea
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
          className="font-mono h-32 resize-y whitespace-pre-wrap break-all focus-visible:ring-primary/50"
          spellCheck={false}
        />
      </div>

      {input && data.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid Token</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      )}

      {data.isValid && (
        <Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
          <ShieldCheck className="h-4 w-4 !text-green-600 dark:!text-green-400" />
          <AlertTitle>Valid Token Format</AlertTitle>
          <AlertDescription className="text-xs mt-1 text-green-700/80 dark:text-green-400/80">
            Decoded locally. Your token was not sent to any server.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-2 flex flex-col h-full">
          <label className="text-sm font-semibold uppercase tracking-wider text-rose-500">
            Header
          </label>
          <Textarea
            value={getFormatStr(data.header)}
            readOnly
            className="flex-1 min-h-[150px] font-mono border-rose-200 focus-visible:ring-0 bg-rose-50/30 text-rose-900 dark:bg-rose-950/10 dark:text-rose-200 dark:border-rose-900/30"
          />
        </div>

        <div className="space-y-2 flex flex-col h-full">
          <label className="text-sm font-semibold uppercase tracking-wider text-purple-500">
            Payload
          </label>
          <Textarea
            value={getFormatStr(data.payload)}
            readOnly
            className="flex-1 min-h-[300px] font-mono border-purple-200 focus-visible:ring-0 bg-purple-50/30 text-purple-900 dark:bg-purple-950/10 dark:text-purple-200 dark:border-purple-900/30"
          />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-blue-500">
          Signature
        </label>
        <Textarea
          value={data.signature}
          readOnly
          className="h-16 font-mono border-blue-200 focus-visible:ring-0 bg-blue-50/30 text-blue-900 shrink-0 resize-none dark:bg-blue-950/10 dark:text-blue-200 dark:border-blue-900/30"
        />
      </div>
    </div>
  );
}
