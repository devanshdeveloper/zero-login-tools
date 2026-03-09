"use client";
import { useState } from "react";
import { encodeUrl, decodeUrl } from "@/registry/tools/text/url-encoder/engine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";

export function UrlEditor() {
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
    if (currentMode === "encode") setOutput(encodeUrl(val));
    else setOutput(decodeUrl(val).value);
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
          onClick={() => {
            setMode("encode");
            process(input, "encode");
          }}
          className="w-32"
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => {
            setMode("decode");
            process(input, "decode");
          }}
          className="w-32"
        >
          Decode
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label>Input</label>
          <Textarea
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            placeholder={
              mode === "encode"
                ? "https://example.com/search?q=hello world"
                : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
            }
            className="flex-1 min-h-[300px]"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center px-2">
            <span>Output</span>
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
              )}{" "}
              Copy
            </Button>
          </div>
          <Textarea value={output} readOnly className="flex-1 min-h-[300px]" />
        </div>
      </div>
    </div>
  );
}
