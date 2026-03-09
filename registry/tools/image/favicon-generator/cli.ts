// Standard CLI definition export
export const cli = {
  name: "favicon-generator",
  description: "CLI description for favicon-generator",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for favicon-generator not fully implemented.");
  },
};
