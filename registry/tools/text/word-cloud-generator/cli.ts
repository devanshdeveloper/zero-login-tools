// Standard CLI definition export
export const cli = {
  name: "word-cloud-generator",
  description: "CLI description for word-cloud-generator",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for word-cloud-generator not fully implemented.");
  },
};
