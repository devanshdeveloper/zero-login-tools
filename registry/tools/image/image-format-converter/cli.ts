// Standard CLI definition export
export const cli = {
  name: "image-format-converter",
  description: "CLI description for image-format-converter",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for image-format-converter not fully implemented.");
  },
};
