// Standard CLI definition export
export const cli = {
  name: "css-minifier",
  description: "CLI description for css-minifier",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for css-minifier not fully implemented.");
  },
};
