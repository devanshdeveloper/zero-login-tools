// Standard CLI definition export
export const cli = {
  name: "markdown-html",
  description: "CLI description for markdown-html",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for markdown-html not fully implemented.");
  },
};
