import { getAvailableLanguages } from "../../service/fs/rootpath";
import Logger from "../../service/logger";
import { checkbox } from "@inquirer/prompts";
import { generatorToArray } from "../../utils/typeutil";

/**
 * Shows message asking what language the user's planning to use,
 * and gets the answer.
 */
export async function askLanguages(): Promise<string[]> {
  const availableLangs: string[] = await generatorToArray(getAvailableLanguages());
  
  const choices = await checkbox({
    message: "Select the languages you're planning to use.",
    choices: availableLangs.map((lang) => ({
      name: lang,
      value: lang,
    })),
    required: true,
  });

  return choices;
}

export function recommendAdd() {
  Logger.print("Try typing `bjf add 2042`!");
}
