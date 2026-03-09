import { ReactNode } from "react";
import { getToolBySlug } from "@/lib/tools/get-tool";
import { notFound } from "next/navigation";

export default async function EmbedLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Embed version explicitly skips the global headers/footers in the root layout if possible
  // (though Next App Router root layout still applies unless grouped, so we rely on hiding specifics)
  return (
    <div className="bg-transparent w-full h-screen overflow-auto p-0 m-0">
      <div className="embed-wrapper border rounded-md shadow-sm bg-background p-2 m-2">
        {/* Minimal Header indicating what tool this is within the widget */}
        <div className="text-xs bg-muted/30 px-2 py-1 flex items-center justify-between mb-2">
          <span className="font-semibold text-muted-foreground">
            {tool.name} Widget
          </span>
          <span className="text-[10px] text-muted-foreground">
            Powered by ZeroLoginTools
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
