// Standard CLI definition export
export const cli = {
  name: "pdf-compress",
  description: "CLI description for pdf-compress",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for pdf-compress not fully implemented.");
  },
};
