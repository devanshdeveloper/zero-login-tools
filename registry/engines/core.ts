import { EngineContext, BenchmarkStats } from "@/registry/types";

export interface EngineExecutionResult<TOutput> {
  output?: TOutput;
  error?: Error;
  benchmark: BenchmarkStats;
}

/**
 * Standardized wrapper for engine tools to automatically capture benchmarks,
 * catch errors, and ensure consistent callback execution.
 */
export async function executeEngine<TInput, TOptions, TOutput>(
  context: EngineContext<TInput, TOptions>,
  runner: (ctx: EngineContext<TInput, TOptions>) => Promise<TOutput> | TOutput,
): Promise<EngineExecutionResult<TOutput>> {
  const startMs = performance.now();
  let error: Error | undefined;
  let output: TOutput | undefined;

  try {
    context.callback({ status: "running", progress: 0 });
    output = await runner(context);
    context.callback({ status: "success", progress: 100 });
  } catch (err: unknown) {
    error = err instanceof Error ? err : new Error(String(err));
    context.callback({ status: "error", message: error.message }, error);
  }

  const endMs = performance.now();
  const averageMs = endMs - startMs;

  return {
    output,
    error,
    benchmark: {
      averageMs,
      label: `Completed in ${averageMs.toFixed(2)}ms`,
    },
  };
}
