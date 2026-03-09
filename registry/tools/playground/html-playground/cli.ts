// Standard CLI definition export
export const cli = {
  name: "html-playground",
  description: "CLI description for html-playground",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for html-playground not fully implemented.");
  },
};
