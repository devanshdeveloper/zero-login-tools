// Standard CLI definition export
export const cli = {
  name: "jwt-decoder",
  description: "CLI description for jwt-decoder",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for jwt-decoder not fully implemented.");
  },
};
