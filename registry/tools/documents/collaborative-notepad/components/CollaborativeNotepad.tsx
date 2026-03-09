"use client";

import { useMemo, useState } from "react";
import { buildShareUrl, parseSharedContentFromHash, getTextStats } from "@/registry/engines/textStatsEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Copy, Link as LinkIcon, RefreshCw, AlertCircle } from "lucide-react";

export function CollaborativeNotepad() {
  const [text, setText] = useState(() => {
    if (typeof window === "undefined") return "";
    const parsed = parseSharedContentFromHash(window.location.hash);
    return parsed.success ? parsed.content : "";
  });
  const [status, setStatus] = useState<{ type: "info" | "error"; message: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const parsed = parseSharedContentFromHash(window.location.hash);
    return parsed.success
      ? { type: "info", message: "Loaded shared note from the link." }
      : null;
  });
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => getTextStats(text), [text]);

  const generateLink = () => {
    const base = window.location.href.split("#")[0];
    const res = buildShareUrl(base, text, { maxChars: 50_000 });
    if (!res.success) {
      setShareUrl("");
      setStatus({ type: "error", message: res.error ?? "Failed to build share link." });
      return;
    }
    setShareUrl(res.url ?? "");
    setStatus({ type: "info", message: "Share link generated. Send it to collaborate." });
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const reloadFromLink = () => {
    const parsed = parseSharedContentFromHash(window.location.hash);
    if (parsed.success) {
      setText(parsed.content);
      setStatus({ type: "info", message: "Reloaded note from the link." });
    } else {
      setStatus({ type: "error", message: parsed.error ?? "Unknown error" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Words: <span className="text-foreground font-medium">{stats.words}</span> • Characters:{" "}
          <span className="text-foreground font-medium">{stats.characters}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={generateLink} className="gap-2">
            <LinkIcon className="w-4 h-4" />
            Generate share link
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            disabled={!shareUrl}
            className="gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button variant="ghost" size="sm" onClick={reloadFromLink} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Reload from link
          </Button>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setShareUrl("");
        }}
        placeholder="Type a note. Click “Generate share link” to create a collaboration link."
        className="font-mono h-[520px] resize-none shadow-inner"
        spellCheck={false}
      />

      {shareUrl && (
        <div className="border-2 border-border rounded-lg p-4 bg-muted/10">
          <p className="text-sm font-medium mb-2">Share link</p>
          <p className="text-xs text-muted-foreground break-all">{shareUrl}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Anyone with this link can see the note content stored in the URL fragment. Nothing is uploaded to a server.
          </p>
        </div>
      )}

      {status && (
        <Alert variant={status.type === "error" ? "destructive" : "default"}>
          {status.type === "error" ? <AlertCircle className="h-4 w-4" /> : null}
          <AlertTitle>{status.type === "error" ? "Issue" : "Info"}</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

