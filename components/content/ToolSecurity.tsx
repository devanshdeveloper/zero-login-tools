import React from "react";
import { ShieldCheck } from "lucide-react";

export interface ToolSecurityProps {
  title?: string;
  description?: string;
}

export function ToolSecurity({
  title = "Secure & Private",
  description = "All processing happens securely. For local tools, your files and data never leave your device, ensuring maximum privacy and security.",
}: ToolSecurityProps) {
  return (
    <section className="my-8 border rounded-lg p-6 bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full shrink-0">
        <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-500" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-green-800 dark:text-green-400 mb-1">
          {title}
        </h2>
        <p className="text-green-700 dark:text-green-500/80 text-sm">
          {description}
        </p>
      </div>
    </section>
  );
}
