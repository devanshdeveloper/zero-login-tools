import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLink } from "./RelatedTools";

export interface PopularToolsProps {
  title?: string;
  tools: ToolLink[];
}

export function PopularTools({
  title = "Popular Tools",
  tools,
}: PopularToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="my-12 py-8 border-y">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href="/tools"
          className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.slice(0, 6).map((tool, i) => (
          <Link
            key={i}
            href={tool.href}
            className="group flex flex-col p-5 border rounded-xl hover:border-primary transition-all bg-card hover:shadow-md"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {tool.name}
            </h3>
            {tool.description && (
              <p className="text-sm text-muted-foreground mt-auto line-clamp-2">
                {tool.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
