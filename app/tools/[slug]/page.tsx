import { ToolLayout } from "@/components/layout/ToolLayout";
import { tools } from "@/lib/tools/tool-registry";
import { getToolBySlug } from "@/lib/tools/get-tool";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Import all SEO Blocks
import {
  ToolIntro,
  ToolInstructions,
  ToolExamples,
  HowToUse,
  HowItWorks,
  ToolBenefits,
  ToolFeatures,
  ToolSecurity,
  ToolFAQ,
  RelatedTools,
  PrivacyNotice,
} from "@/components/content";

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | ZeroLoginTools",
    };
  }

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: `https://zerologintools.com/tools/${slug}`,
    },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://zerologintools.com/tools/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seo.title,
      description: tool.seo.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;
  const blocks = tool.contentBlocks || {};

  const howToUseBlock =
    blocks.howToUse ??
    ({
      title: `How to use ${tool.name}`,
      content: (
        <>
          <p>
            Open the tool, paste or upload your input, choose any options, and
            copy or download the output.
          </p>
          <ol>
            <li>Provide input (text, code, or a file) in the tool UI.</li>
            <li>Adjust settings (if available) to match your needs.</li>
            <li>Click the action button (or type) to generate the result.</li>
            <li>Copy or download the output.</li>
          </ol>
        </>
      ),
    } as const);

  const howItWorksBlock =
    blocks.howItWorks ??
    ({
      title: `How ${tool.name} works`,
      content: (
        <>
          <p>
            This tool runs entirely in your browser. It processes your input
            locally using client-side JavaScript and generates an output you can
            copy or download.
          </p>
          <p>
            No accounts, no uploads, and no server-side processing are required.
          </p>
        </>
      ),
    } as const);

  const faqBlock =
    blocks.faq ??
    ({
      title: "FAQ",
      faqs: [
        {
          question: "Is my data uploaded to your servers?",
          answer:
            "No. All processing happens in your browser. Your data stays on your device.",
        },
        {
          question: "What are the limits?",
          answer:
            "Limits depend on your browser and device memory. Very large inputs may be slow or fail in low-memory environments.",
        },
        {
          question: "Can I use this tool offline?",
          answer:
            "Yes, after the page is loaded once, most tools continue to work offline as long as required scripts are available in your browser cache.",
        },
      ],
    } as const);

  // Resolve related tools
  const relatedToolsLinks = tool.relatedTools
    .map((relSlug: string) => getToolBySlug(relSlug))
    .filter((t): t is NonNullable<ReturnType<typeof getToolBySlug>> => t !== undefined)
    .map((t: NonNullable<ReturnType<typeof getToolBySlug>>) => ({
      name: t!.name,
      href: `/tools/${t!.slug}`,
      description: t!.description,
    }));

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        {/* 1. ToolIntro */}
        {blocks.intro ? (
          <ToolIntro
            title={blocks.intro.title}
            description={blocks.intro.description}
            keywords={blocks.intro.keywords}
          />
        ) : (
          <ToolIntro
            title={tool.name}
            description={tool.description}
            keywords={tool.keywords}
          />
        )}

        {/* 2. Tool UI */}
        <div className="bg-card text-card-foreground border-2 border-border shadow-sm p-1 rounded-xl">
          <ToolComponent />
        </div>

        {/* 3. ToolInstructions */}
        {blocks.instructions && (
          <ToolInstructions
            steps={blocks.instructions.steps}
            title={blocks.instructions.title}
          />
        )}

        {/* 4. ToolExamples */}
        {blocks.examples && (
          <ToolExamples
            examples={blocks.examples.examples}
            title={blocks.examples.title}
          />
        )}

        {/* 5. HowToUse */}
        <HowToUse title={howToUseBlock.title}>{howToUseBlock.content}</HowToUse>

        {/* 6. HowItWorks */}
        <HowItWorks title={howItWorksBlock.title}>
          {howItWorksBlock.content}
        </HowItWorks>

        {/* 7. ToolBenefits */}
        {blocks.benefits && (
          <ToolBenefits
            benefits={blocks.benefits.benefits}
            title={blocks.benefits.title}
          />
        )}

        {/* 8. ToolFeatures */}
        {blocks.features && (
          <ToolFeatures
            features={blocks.features.features}
            title={blocks.features.title}
          />
        )}

        {/* 9. ToolSecurity */}
        <ToolSecurity
          title={blocks.security?.title}
          description={blocks.security?.description}
        />

        {/* 10. ToolFAQ */}
        <ToolFAQ faqs={faqBlock.faqs} title={faqBlock.title} />

        {/* 11. RelatedTools */}
        {relatedToolsLinks.length > 0 && (
          <RelatedTools tools={relatedToolsLinks} />
        )}

        {/* 12. PrivacyNotice */}
        <PrivacyNotice />
      </div>
    </ToolLayout>
  );
}
