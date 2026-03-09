import { getToolBySlug } from "@/lib/tools/get-tool";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Format: target1-to-target2 (e.g. km-to-miles)
  const match = slug.match(/^(.*)-to-(.*)$/);
  if (!match) return { title: "Converter | ZeroLoginTools" };

  const targetFrom = match[1].replace(/-/g, " ");
  const targetTo = match[2].replace(/-/g, " ");

  return {
    title: `Convert ${targetFrom} to ${targetTo} instantly | ZeroLoginTools`,
    description: `Free, fully offline ${targetFrom} to ${targetTo} converter tool. Instant conversion running securely in your browser.`,
  };
}

export default async function ConvertDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const match = slug.match(/^(.*)-to-(.*)$/);
  if (!match) notFound();

  const targetFrom = match[1].replace(/-/g, " ");
  const targetTo = match[2].replace(/-/g, " ");

  // For programmatic conversions, we rely heavily on the unit-converter under the hood
  const baseConverter = getToolBySlug("unit-converter");
  if (!baseConverter) notFound();

  // Load the actual UI for the converter but pre-rendered or wrapped
  const ConverterWidget = baseConverter.component;

  return (
    <ToolLayout tool={baseConverter}>
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4 capitalize">
          {targetFrom} to {targetTo} Converter
        </h1>
        <p className="text-muted-foreground">
          Instantly convert {targetFrom} into {targetTo} directly in your
          browser without lag or file uploads.
        </p>
      </div>

      <div className="bg-card text-card-foreground border-2 border-border shadow-sm p-4 rounded-xl mb-12">
        {ConverterWidget && <ConverterWidget />}
      </div>

      <article className="prose dark:prose-invert">
        <h2>
          How to convert {targetFrom} to {targetTo}?
        </h2>
        <ol>
          <li>Launch the converter interface above.</li>
          <li>Select exactly the specific unit you wish to convert from.</li>
          <li>Enter the numeric value of the {targetFrom}.</li>
          <li>
            The {targetTo} result will dynamically formulate on your screen!
          </li>
        </ol>
        <p>
          As part of our commitment at ZeroLoginTools, none of your conversion
          inputs are transmitted or logged onto any databases whatsoever.
          Privacy first.
        </p>
      </article>
    </ToolLayout>
  );
}
