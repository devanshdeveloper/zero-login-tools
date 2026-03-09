// Standard CLI definition export
export const cli = {
  name: "pdf-to-image",
  description: "CLI description for pdf-to-image",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for pdf-to-image not fully implemented.");
  },
};
