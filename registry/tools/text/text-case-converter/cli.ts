// Standard CLI definition export
export const cli = {
  name: "text-case-converter",
  description: "CLI description for text-case-converter",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for text-case-converter not fully implemented.");
  },
};
