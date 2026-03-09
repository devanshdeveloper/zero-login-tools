// Standard CLI definition export
export const cli = {
  name: "diff-checker",
  description: "CLI description for diff-checker",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for diff-checker not fully implemented.");
  },
};
