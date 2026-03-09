// Standard CLI definition export
export const cli = {
  name: "base64-encoder",
  description: "CLI description for base64-encoder",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for base64-encoder not fully implemented.");
  },
};
