// Standard CLI definition export
export const cli = {
  name: "html-to-markdown",
  description: "CLI description for html-to-markdown",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for html-to-markdown not fully implemented.");
  },
};
