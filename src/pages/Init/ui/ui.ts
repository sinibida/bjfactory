import { askTemplateMulti } from "@/features/SelectTemplate";
import Logger from "@/shared/api/logger";

/**
 * Shows message asking what language the user's planning to use,
 * and gets the answer.
 */
export async function askLanguages(): Promise<string[]> {
  return await askTemplateMulti({
    message: "Select the languages you're planning to use.",
  });
}

export function recommendAdd() {
  Logger.print("Try typing `bjf add 2042`!");
}
