// Standard CLI definition export
export const cli = {
  name: "image-metadata-viewer",
  description: "CLI description for image-metadata-viewer",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for image-metadata-viewer not fully implemented.");
  },
};
