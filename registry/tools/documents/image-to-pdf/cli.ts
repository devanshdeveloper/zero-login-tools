// Standard CLI definition export
export const cli = {
  name: "image-to-pdf",
  description: "CLI description for image-to-pdf",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for image-to-pdf not fully implemented.");
  },
};
