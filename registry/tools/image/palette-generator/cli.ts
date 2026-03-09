// Standard CLI definition export
export const cli = {
  name: "palette-generator",
  description: "CLI description for palette-generator",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for palette-generator not fully implemented.");
  },
};
