"use client";

import { useState } from "react";
import { ToolSummary } from "@/lib/tools/tool-registry";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/ui/ToolCard";

export function HomeSearch({ tools }: { tools: ToolSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered =
    query.trim() === ""
      ? []
      : tools.filter(
          (t) =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <div className="relative w-full max-w-2xl mx-auto text-left">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
        <Input
          className="h-14 pl-10 pr-4 w-full"
          placeholder="Search tools (e.g. JSON formatter, Base64)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query && (
        <div className="absolute top-16 left-0 right-0 p-2 z-50 max-h-[60vh] overflow-y-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filtered.map((t) => (
                <ToolCard
                  key={t.slug}
                  title={t.name}
                  description={t.description}
                  href={`/tools/${t.slug}`}
                  isNew={t.new}
                  isPopular={t.popular}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              No tools found matching &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
