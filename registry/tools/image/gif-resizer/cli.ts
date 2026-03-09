// Standard CLI definition export
export const cli = {
  name: "gif-resizer",
  description: "CLI description for gif-resizer",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for gif-resizer not fully implemented.");
  },
};
