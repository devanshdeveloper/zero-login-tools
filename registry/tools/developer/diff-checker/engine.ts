import { executeEngine, EngineExecutionResult } from "@/registry/engines/core";
import { EngineContext } from "@/registry/types";

export interface Options {}
export type Output = any;

export async function runEngine(
  context: EngineContext<any, Options>,
): Promise<EngineExecutionResult<Output>> {
  return executeEngine(
    context,
    async (ctx) => {
      ctx.callback({
        status: "running",
        progress: 50,
        message: "Processing...",
      });
      // Implementation logic here
      return ctx.input;
    },
  );
}
