import { getToolBySlug, getAllTools } from "@/lib/tools/get-tool";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Documentation | ZeroLoginTools Docs`,
    description: `Official documentation and API reference for the ${tool.name} client-side tool.`,
  };
}

export default async function ToolDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link href="/docs" className="hover:text-primary">
          Docs
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="border-b pb-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {tool.name}
          </h1>
          {tool.popular && <Badge variant="default">Popular</Badge>}
        </div>
        <p className="text-xl text-muted-foreground">{tool.description}</p>

        <div className="flex gap-2 mt-6">
          {tool.flags.cli_supported && (
            <Badge variant="secondary">
              <Terminal className="w-3 h-3 mr-1" /> CLI Available
            </Badge>
          )}
          {tool.flags.supports_batch && (
            <Badge variant="outline">Batch Mode Support</Badge>
          )}
          {tool.flags.supports_chain && (
            <Badge variant="outline">Chainable Output</Badge>
          )}
        </div>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h2>Overview</h2>
        {tool.contentBlocks?.intro?.description ? (
          <p>{tool.contentBlocks.intro.description}</p>
        ) : (
          <p>
            This tool allows you to perform operations strictly locally inside
            the browser. Use the intuitive UI or script it using our CLI tool.
          </p>
        )}

        <h2>Under the Hood Engine</h2>
        <p>
          This tool utilizes a deterministic engine written in completely pure
          Typescript. It communicates via the generic <code>executeEngine</code>{" "}
          wrapper to report progress updates.
        </p>

        {tool.flags.cli_supported && (
          <>
            <h2>CLI Usage</h2>
            <p>
              You can execute this tool via your terminal using our node
              execution wrapper:
            </p>
            <pre className="relative">
              <code>npx zerologintools {tool.slug} [input] [options]</code>
            </pre>
          </>
        )}

        <h2>Embeddable Widget</h2>
        <p>
          Want to use {tool.name} directly on your own website? You can safely
          embed our lightweight, navigation-free version inside an iframe:
        </p>
        <pre>
          <code>{`<iframe src="https://zerologintools.com/embed/${tool.slug}" width="100%" height="600" frameBorder="0"></iframe>`}</code>
        </pre>

        {tool.relatedTools && tool.relatedTools.length > 0 && (
          <>
            <h2>Related Utilities</h2>
            <ul>
              {tool.relatedTools.map((rel) => (
                <li key={rel}>
                  <Link href={`/tools/${rel}`}>{rel}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
