"use client";

import { useState, useEffect } from "react";
import { convertMarkdown } from "@/lib/engines/markdownEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Trash2 } from "lucide-react";

export function MarkdownEditor() {
  const [input, setInput] = useState(
    "# Hello World\n\nWrite **markdown** here!",
  );
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    const process = async () => {
      setHtml(await convertMarkdown(input));
    };
    process();
  }, [input]);

  const handleCopy = () => {
    if (!html) return;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Editor Pane */}
        <div className="flex flex-col h-full border rounded-md shadow-sm bg-background overflow-hidden relative">
          <div className="bg-muted/50 px-4 py-2 border-b text-sm font-medium text-muted-foreground flex justify-between items-center bg-zinc-50 dark:bg-zinc-900">
            Markdown
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInput("")}
              className="h-7 px-2 text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none border-0 focus-visible:ring-0 p-4 font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Output Pane */}
        <div className="flex flex-col h-full border rounded-md shadow-sm bg-background overflow-hidden relative">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col w-full"
          >
            <div className="bg-muted/50 px-2 py-1.5 border-b flex justify-between items-center bg-zinc-50 dark:bg-zinc-900">
              <TabsList className="h-8 bg-transparent p-0 space-x-2">
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs h-7 px-3 border border-transparent data-[state=active]:border-border"
                >
                  Live Preview
                </TabsTrigger>
                <TabsTrigger
                  value="html"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs h-7 px-3 border border-transparent data-[state=active]:border-border"
                >
                  HTML Source
                </TabsTrigger>
              </TabsList>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!html}
                className="h-7 text-xs px-2"
              >
                {copied ? (
                  <Check className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 mr-1" />
                )}
                Copy HTML
              </Button>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <TabsContent
                value="preview"
                className="absolute inset-0 m-0 p-6 overflow-y-auto w-full prose dark:prose-invert max-w-none data-[state=inactive]:hidden"
              >
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </TabsContent>

              <TabsContent
                value="html"
                className="absolute inset-0 m-0 w-full data-[state=inactive]:hidden"
              >
                <Textarea
                  value={html}
                  readOnly
                  className="w-full h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm bg-zinc-50/50 dark:bg-zinc-900/50 p-4"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
