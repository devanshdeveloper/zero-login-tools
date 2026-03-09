// Standard CLI definition export
export const cli = {
  name: "markdown-to-pdf",
  description: "CLI description for markdown-to-pdf",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for markdown-to-pdf not fully implemented.");
  },
};
