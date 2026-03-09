// Standard CLI definition export
export const cli = {
  name: "json-api-tester",
  description: "CLI description for json-api-tester",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for json-api-tester not fully implemented.");
  },
};
