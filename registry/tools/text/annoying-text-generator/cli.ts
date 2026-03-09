// Standard CLI definition export
export const cli = {
  name: "annoying-text-generator",
  description: "CLI description for annoying-text-generator",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for annoying-text-generator not fully implemented.");
  },
};
