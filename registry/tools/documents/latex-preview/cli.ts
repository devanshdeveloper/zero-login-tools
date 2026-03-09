// Standard CLI definition export
export const cli = {
  name: "latex-preview",
  description: "CLI description for latex-preview",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for latex-preview not fully implemented.");
  },
};
