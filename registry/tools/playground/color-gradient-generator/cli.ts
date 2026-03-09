// Standard CLI definition export
export const cli = {
  name: "color-gradient-generator",
  description: "CLI description for color-gradient-generator",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for color-gradient-generator not fully implemented.");
  },
};
