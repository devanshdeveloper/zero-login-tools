// Standard CLI definition export
export const cli = {
  name: "spreadsheet-editor",
  description: "CLI description for spreadsheet-editor",
  arguments: [
    {
      name: "input",
      description: "Input data",
      required: true,
    },
  ],
  options: [],
  action: async (input: string, options: any) => {
    console.log("CLI action for spreadsheet-editor not fully implemented.");
  },
};
