"use client";

import { useState } from "react";
import { encodeBase64, decodeBase64 } from "@/lib/engines/base64Engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";

export function Base64Editor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = (val: string, currentMode: "encode" | "decode") => {
    setInput(val);
    if (!val) {
      setOutput("");
      return;
    }

    if (currentMode === "encode") {
      setOutput(encodeBase64(val));
    } else {
      const res = decodeBase64(val);
      setOutput(res.value);
    }
  };

  const handleModeSwitch = (newMode: "encode" | "decode") => {
    setMode(newMode);
    process(input, newMode);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => handleModeSwitch("encode")}
          className="w-32"
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => handleModeSwitch("decode")}
          className="w-32"
        >
          Decode
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <div className="space-y-2 flex flex-col">
          <label className="flex justify-between">
            {mode === "encode" ? "Text to encode" : "Base64 to decode"}
            <span>{input.length} chars</span>
          </label>
          <Textarea
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            placeholder={
              mode === "encode" ? "Hello World..." : "SGVsbG8gV29ybGQuLi4="
            }
            className="flex-1 min-h-[300px]"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <div className="flex justify-between items-center px-2">
            <span>Result</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea value={output} readOnly className="flex-1 min-h-[300px]" />
        </div>
      </div>
    </div>
  );
}
