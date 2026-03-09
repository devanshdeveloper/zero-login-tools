"use client";

import { useState, useEffect } from "react";
import { convertMarkdown } from "@/registry/engines/markdownEngine";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarkdownPreview() {
  const [input, setInput] = useState("# Hello\n\nWrite **markdown** and see the live preview.");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const run = async () => {
      setHtml(await convertMarkdown(input));
    };
    run();
  }, [input]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <div className="flex flex-col h-full border rounded-md shadow-sm bg-background overflow-hidden">
          <div className="bg-muted/50 px-4 py-2 border-b flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Markdown</span>
            <Button variant="ghost" size="sm" onClick={() => setInput("")}>
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none border-0 focus-visible:ring-0 p-4 font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col h-full border rounded-md shadow-sm bg-background overflow-hidden">
          <div className="bg-muted/50 px-4 py-2 border-b text-sm font-medium text-muted-foreground">
            Live Preview
          </div>
          <div
            className="flex-1 overflow-y-auto p-6 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
