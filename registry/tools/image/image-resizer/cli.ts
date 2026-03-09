// Standard CLI definition export
export const cli = {
  name: "image-resizer",
  description: "CLI description for image-resizer",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for image-resizer not fully implemented.");
  },
};
