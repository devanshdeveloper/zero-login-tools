import { getToolBySlug } from "@/lib/tools/get-tool";
import { notFound } from "next/navigation";

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || !tool.component || !tool.flags.embeddable) {
    notFound();
  }

  const ToolComponent = tool.component;

  return <ToolComponent />;
}
