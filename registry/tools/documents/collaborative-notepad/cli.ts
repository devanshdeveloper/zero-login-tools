// Standard CLI definition export
export const cli = {
  name: "collaborative-notepad",
  description: "CLI description for collaborative-notepad",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for collaborative-notepad not fully implemented.");
  },
};
