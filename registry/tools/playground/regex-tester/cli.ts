// Standard CLI definition export
export const cli = {
  name: "regex-tester",
  description: "CLI description for regex-tester",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for regex-tester not fully implemented.");
  },
};
