// Standard CLI definition export
export const cli = {
  name: "html-to-pdf",
  description: "CLI description for html-to-pdf",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for html-to-pdf not fully implemented.");
  },
};
