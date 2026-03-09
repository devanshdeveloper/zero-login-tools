// Standard CLI definition export
export const cli = {
  name: "markdown-preview",
  description: "CLI description for markdown-preview",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for markdown-preview not fully implemented.");
  },
};
