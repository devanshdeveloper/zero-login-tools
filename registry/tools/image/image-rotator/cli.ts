// Standard CLI definition export
export const cli = {
  name: "image-rotator",
  description: "CLI description for image-rotator",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for image-rotator not fully implemented.");
  },
};
