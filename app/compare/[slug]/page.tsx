import { getToolBySlug } from "@/lib/tools/get-tool";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = slug.match(/^(.*)-vs-(.*)$/);
  if (!match) return { title: "Compare Tools | ZeroLoginTools" };

  const [, tool1Id, tool2Id] = match;
  const t1 = getToolBySlug(tool1Id);
  const t2 = getToolBySlug(tool2Id);

  if (!t1 || !t2) return { title: "Tool Comparison Not Found" };

  return {
    title: `${t1.name} vs ${t2.name}: Which is Better? | ZeroLoginTools`,
    description: `Detailed comparison of ${t1.name} and ${t2.name}. Discover their differences, features, and which one you should use.`,
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = slug.match(/^(.*)-vs-(.*)$/);
  if (!match) notFound();

  const [, tool1Id, tool2Id] = match;
  const tool1 = getToolBySlug(tool1Id);
  const tool2 = getToolBySlug(tool2Id);

  if (!tool1 || !tool2) notFound();

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-primary">
          Tools
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Compare</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground">
          {tool1.name} vs {tool2.name}
        </span>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tight mb-4">
          {tool1.name}{" "}
          <span className="text-muted-foreground font-normal mx-2">vs</span>{" "}
          {tool2.name}
        </h1>
        <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">
          A comprehensive comparison of features, usage, and local capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Tool 1 */}
        <div className="border rounded-2xl p-8 bg-card shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{tool1.name}</h2>
            <div className="flex bg-primary rounded-md px-4 py-2 text-primary-foreground font-medium text-sm hover:bg-primary/90">
              <Link href={`/tools/${tool1.slug}`}>Open Tool</Link>
            </div>
          </div>
          <p className="text-muted-foreground mb-6 h-12 line-clamp-2">
            {tool1.description}
          </p>

          <h3 className="font-semibold mb-4 text-emerald-600 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2" /> Key Capabilities
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Batch
              mode {tool1.flags?.supports_batch ? "available" : "unavailable"}
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> CLI{" "}
              {tool1.flags?.cli_supported ? "supported" : "not supported"}
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Free
              offline use
            </li>
          </ul>
        </div>

        {/* Tool 2 */}
        <div className="border rounded-2xl p-8 bg-card shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{tool2.name}</h2>
            <div className="flex bg-primary rounded-md px-4 py-2 text-primary-foreground font-medium text-sm hover:bg-primary/90">
              <Link href={`/tools/${tool2.slug}`}>Open Tool</Link>
            </div>
          </div>
          <p className="text-muted-foreground mb-6 h-12 line-clamp-2">
            {tool2.description}
          </p>

          <h3 className="font-semibold mb-4 text-emerald-600 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2" /> Key Capabilities
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Batch
              mode {tool2.flags?.supports_batch ? "available" : "unavailable"}
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> CLI{" "}
              {tool2.flags?.cli_supported ? "supported" : "not supported"}
            </li>
            <li className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Free
              offline use
            </li>
          </ul>
        </div>
      </div>

      <div className="prose prose-p:text-muted-foreground dark:prose-invert max-w-none">
        <h2>When to use {tool1.name}?</h2>
        <p>
          Use <strong>{tool1.name}</strong> if you need robust capabilities
          specifically aligned with {tool1.category}. It is optimized for{" "}
          {tool1.keywords.slice(0, 3).join(", ")}. Unlike cloud alternatives, it
          guarantees total privacy.
        </p>

        <h2>When to use {tool2.name}?</h2>
        <p>
          Use <strong>{tool2.name}</strong> for tasks focusing on{" "}
          {tool2.keywords.slice(0, 3).join(", ")}. It operates fully client-side
          and offers specialized functionality under our {tool2.category}{" "}
          section.
        </p>
      </div>
    </div>
  );
}
