// Standard CLI definition export
export const cli = {
  name: "sql-visualizer",
  description: "CLI description for sql-visualizer",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for sql-visualizer not fully implemented.");
  },
};
