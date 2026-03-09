// Standard CLI definition export
export const cli = {
  name: "url-encoder",
  description: "CLI description for url-encoder",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for url-encoder not fully implemented.");
  },
};
