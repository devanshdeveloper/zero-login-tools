// Standard CLI definition export
export const cli = {
  name: "word-counter",
  description: "CLI description for word-counter",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for word-counter not fully implemented.");
  },
};
