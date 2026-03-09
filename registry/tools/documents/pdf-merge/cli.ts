// Standard CLI definition export
export const cli = {
  name: "pdf-merge",
  description: "CLI description for pdf-merge",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for pdf-merge not fully implemented.");
  },
};
