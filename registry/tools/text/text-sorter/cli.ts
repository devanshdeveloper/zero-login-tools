// Standard CLI definition export
export const cli = {
  name: "text-sorter",
  description: "CLI description for text-sorter",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for text-sorter not fully implemented.");
  },
};
