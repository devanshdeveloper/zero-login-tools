import { getAllCategories, getToolsForCategory } from "@/registry/index";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

export const metadata = {
  title: "Documentation | ZeroLoginTools",
  description:
    "Read the comprehensive developer documentation for all ZeroLoginTools utilities.",
};

export default function DocsIndexPage() {
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
          <FileText className="w-10 h-10 text-primary" />
          ZeroLoginTools Documentation
        </h1>
        <p className="text-xl text-muted-foreground border-l-4 pl-4 border-primary">
          Discover how each tool works under the hood, capabilities, and API
          equivalents. All engines operate fully client-side.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const tools = getToolsForCategory(category.slug);
          if (!tools.length) return null;

          return (
            <section key={category.slug}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {category.name}
              </h2>
              <div className="bg-card rounded-lg border shadow-sm divide-y">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/docs/${tool.slug}`}
                    className="group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
