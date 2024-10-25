import { input } from "@inquirer/prompts";

export async function askProblemName() {
  const inp = await input({
    message: "Enter the problem name",
  });
  return {
    response: inp,
    folderName: inp.replace(/\s/g, "-"),
  };
}
