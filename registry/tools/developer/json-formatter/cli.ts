import { runJsonFormatter } from "./engine";

// Standard CLI definition export
export const cli = {
  name: "json-formatter",
  description: "Format or minify JSON strings.",
  arguments: [
    {
      name: "input",
      description: "JSON string or path to JSON file",
      required: true,
    },
  ],
  options: [
    { name: "minify", type: "boolean", description: "Minify output" },
    {
      name: "space",
      type: "number",
      description: "Indentation spaces (default: 2)",
    },
  ],
  action: async (input: string, options: any) => {
    // Note: If input is a path, the CLI runner should read it first.
    // Assuming input is raw JSON content here for simplicity.
    const result = await runJsonFormatter({
      input,
      options: {
        action: options.minify ? "minify" : "format",
        space: options.space || 2,
      },
      callback: () => {}, // Console progress or silent
    });

    if (result.error) {
      console.error("Error:", result.error.message);
      process.exit(1);
    }
    console.log(result.output);
  },
};
