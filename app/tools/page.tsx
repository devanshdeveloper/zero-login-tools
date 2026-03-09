import { getAllCategories, getToolsForCategory } from "@/registry/index";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "All Tools | ZeroLoginTools",
  description:
    "Browse all free developer utilities and tools grouped by category.",
};

export default function ToolsDirectoryPage() {
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Tool Directory
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of fully local, zero-login developer utilities.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => {
          const tools = getToolsForCategory(category.slug);
          if (tools.length === 0) return null;

          return (
            <div
              key={category.slug}
              className="scroll-mt-24"
              id={category.slug}
            >
              <div className="flex items-center gap-2 mb-6 border-b pb-2">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Badge variant="secondary">{tools.length}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group h-full"
                  >
                    <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                      {tool.popular && (
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                          POPULAR
                        </div>
                      )}
                      {tool.new && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                          NEW
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors flex items-center justify-between">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {tool.flags.supports_batch && (
                            <Badge variant="outline" className="text-[10px]">
                              Batch
                            </Badge>
                          )}
                          {tool.flags.supports_chain && (
                            <Badge variant="outline" className="text-[10px]">
                              Chain
                            </Badge>
                          )}
                          {tool.flags.cli_supported && (
                            <Badge variant="outline" className="text-[10px]">
                              CLI
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
