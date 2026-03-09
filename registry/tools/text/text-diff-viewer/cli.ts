// Standard CLI definition export
export const cli = {
  name: "text-diff-viewer",
  description: "CLI description for text-diff-viewer",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for text-diff-viewer not fully implemented.");
  },
};
