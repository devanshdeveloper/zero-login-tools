import { toolSummaries } from "@/lib/tools/tool-registry";
import { categories } from "@/data/categories";
import { HomeSearch } from "@/components/home/HomeSearch";
import { ToolCard } from "@/components/ui/ToolCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroLoginTools - Free Instant Browser Tools & Web Utilities",
  description:
    "A comprehensive library of free web utilities. Format JSON, convert text, and process data entirely client-side without logging in or server computation.",
  alternates: {
    canonical: "https://zerologintools.com",
  },
};

export default function Home() {
  const popularTools = toolSummaries.filter((t) => t.popular);
  const newTools = toolSummaries.filter((t) => t.new);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl space-y-24 mb-16">
      {/* Hero Section */}
      <section className="space-y-6 max-w-3xl mx-auto relative z-20">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Tools that work instantly.
          <br />
          <span className="text-muted-foreground">No login required.</span>
        </h1>
        <h2 className="mt-4 text-xl md:text-2xl text-muted-foreground font-normal">
          Open page → Use tool instantly → Leave.
          <br />
          Fully client-side, zero server processing.
        </h2>
        <div className="pt-8">
          <HomeSearch tools={toolSummaries} />
        </div>
      </section>

      {/* Grid displays */}
      <div className="space-y-16">
        <section>
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Popular Developer & Text Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((t) => (
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
        </section>

        {newTools.length > 0 && (
          <section>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Newest Web Utilities
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newTools.map((t) => (
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
          </section>
        )}

        <section>
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Browse Tools by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter((c) => !c.parentId)
              .map((rootCat) => (
                <ToolCard
                  key={rootCat.id}
                  title={rootCat.name}
                  description={rootCat.description}
                  href={`/categories/${rootCat.id}`}
                  actionText="Browse Category"
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
