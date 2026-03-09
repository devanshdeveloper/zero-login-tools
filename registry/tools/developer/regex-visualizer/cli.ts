// Standard CLI definition export
export const cli = {
  name: "regex-visualizer",
  description: "CLI description for regex-visualizer",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for regex-visualizer not fully implemented.");
  },
};
