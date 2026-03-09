// Standard CLI definition export
export const cli = {
  name: "image-cropper",
  description: "CLI description for image-cropper",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for image-cropper not fully implemented.");
  },
};
