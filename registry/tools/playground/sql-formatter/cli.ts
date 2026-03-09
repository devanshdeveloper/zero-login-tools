// Standard CLI definition export
export const cli = {
  name: "sql-formatter",
  description: "CLI description for sql-formatter",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for sql-formatter not fully implemented.");
  },
};
