// Standard CLI definition export
export const cli = {
  name: "html-minifier",
  description: "CLI description for html-minifier",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for html-minifier not fully implemented.");
  },
};
