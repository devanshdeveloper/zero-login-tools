import { categories } from "@/data/categories";
import { tools } from "@/lib/tools/tool-registry";
import { ToolCard } from "@/components/ui/ToolCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const paramsValue = await params;
  const category = categories.find((c) => c.id === paramsValue.slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | ZeroLoginTools`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsValue = await params;
  const category = categories.find((c) => c.id === paramsValue.slug);

  if (!category) {
    notFound();
  }

  // Find tools that belong directly to this category, OR subcategories
  const categoryTools = tools.filter(
    (t) =>
      t.category === category.id ||
      categories.find((c) => c.id === t.category)?.parentId === category.id,
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl space-y-12">
      <div className="space-y-4">
        <h1>{category.name}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTools.map((t) => (
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

      {categoryTools.length === 0 && (
        <div className="text-center py-12 border-2 border-border border-dashed shadow-sm">
          <p className="text-muted-foreground">
            No tools available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
