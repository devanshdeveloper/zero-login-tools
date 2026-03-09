export type ToolCategory =
  | "formatting"
  | "text"
  | "cryptography"
  | "crypto-gen"
  | "converters"
  | "web-dev"
  | "media"
  | "developer"
  | "security"
  | "image"
  | "documents"
  | "utilities"
  | "playground";

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ToolContentBlocks {
  intro?: {
    title: string;
    description: string;
    keywords?: string[];
  };
  instructions?: {
    title?: string;
    steps: string[];
  };
  examples?: {
    title?: string;
    examples: {
      label: string;
      input: string;
      output: string;
    }[];
  };
  howToUse?: {
    title?: string;
    content: React.ReactNode;
  };
  howItWorks?: {
    title?: string;
    content: React.ReactNode;
  };
  benefits?: {
    title?: string;
    benefits: {
      title: string;
      description: string;
    }[];
  };
  features?: {
    title?: string;
    features: string[];
  };
  limitations?: {
    title?: string;
    limitations: string[];
  };
  security?: {
    title?: string;
    description: string;
  };
  faq?: {
    title?: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

export interface ToolFlags {
  supports_batch?: boolean;
  supports_chain?: boolean;
  cli_supported?: boolean;
  benchmark_available?: boolean;
  embeddable?: boolean;
}

export interface RegistryTool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  relatedTools?: string[];
  icon: string;
  seo: ToolSEO;
  contentBlocks?: ToolContentBlocks;
  popular?: boolean;
  new?: boolean;
  flags: ToolFlags;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
}

export interface RegistryCategory {
  slug: ToolCategory;
  name: string;
  description: string;
  icon: string;
  seo: ToolSEO;
}

export interface EngineProgress {
  status: "idle" | "running" | "success" | "error";
  progress?: number; // 0 to 100
  message?: string;
  progressPayload?: unknown;
}

export type EngineCallback = (
  progress: EngineProgress,
  error?: Error,
  result?: unknown,
) => void;

export interface EngineContext<TInput = unknown, TOptions = unknown> {
  input: TInput;
  options: TOptions;
  callback: EngineCallback;
}

export type EngineFunction<TInput = unknown, TOptions = unknown> = (
  context: EngineContext<TInput, TOptions>,
) => Promise<unknown> | unknown;

export interface BenchmarkStats {
  averageMs: number;
  memoryUsageMb?: number;
  label?: string; // e.g. "Image compressed in 120ms"
}
