import { allRegistryTools } from "../registry/index";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("ZeroLoginTools CLI");
    console.log("Usage: npx zerologintools <tool-slug> [options]");
    console.log("Available tools (CLI supported):");
    allRegistryTools
      .filter((t) => t.flags?.cli_supported)
      .forEach((t) => {
        console.log(`  - ${t.slug}: ${t.description}`);
      });
    process.exit(0);
  }

  const toolSlug = args[0];
  const tool = allRegistryTools.find((t) => t.slug === toolSlug);

  if (!tool) {
    console.error(`Tool "${toolSlug}" not found in registry.`);
    process.exit(1);
  }

  if (!tool.flags?.cli_supported) {
    console.error(`Tool "${toolSlug}" does not support CLI execution.`);
    process.exit(1);
  }

  try {
    // Dynamic import of the cli logic defined in the tools registry folder
    const mod = await import(
      `../registry/tools/${tool.category}/${tool.slug}/cli.ts`
    );
    if (mod.cli && mod.cli.action) {
      // Very basic positional args mapping for proof of concept
      const inputArg = args[1] || "";
      const optionsArg = { minify: args.includes("--minify") };
      await mod.cli.action(inputArg, optionsArg);
    } else {
      console.error("CLI module poorly formatted.");
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`Error loading CLI for ${toolSlug}:`, errorMsg);
    process.exit(1);
  }
}

main();
