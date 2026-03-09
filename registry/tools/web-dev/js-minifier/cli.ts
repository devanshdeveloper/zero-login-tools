// Standard CLI definition export
export const cli = {
  name: "js-minifier",
  description: "CLI description for js-minifier",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for js-minifier not fully implemented.");
  },
};
