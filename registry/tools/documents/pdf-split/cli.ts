// Standard CLI definition export
export const cli = {
  name: "pdf-split",
  description: "CLI description for pdf-split",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for pdf-split not fully implemented.");
  },
};
