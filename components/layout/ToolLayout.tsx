import { ReactNode } from "react";
import { ToolDefinition } from "@/lib/tools/tool-registry";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 mb-24 max-w-4xl">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link
                href={`/categories/${tool.category}`}
                className="capitalize"
              >
                {tool.category}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span>{tool.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="w-full relative z-10">{children}</div>
    </div>
  );
}
