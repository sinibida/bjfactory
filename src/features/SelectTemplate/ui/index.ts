import { getAvailableLanguages } from "@/shared/api/fs/rootpath";
import { generatorToArray } from "@/shared/utils/typeutil";
import { checkbox, select } from "@inquirer/prompts";

export interface AskLanguageArgs {
  message: string;
}

async function getInquiryArgs(args: AskLanguageArgs | string) {
  if (typeof args === "string") {
    args = {
      message: args,
    };
  }

  const availableLangs: string[] = await generatorToArray(
    getAvailableLanguages(),
  );

  return {
    message: args.message ?? "Select the languages you're planning to use.",
    choices: availableLangs.map((lang) => ({
      name: lang,
      value: lang,
    })),
  };
}

/**
 * Shows message asking what language the user's planning to use,
 * and gets the answer.
 * @returns Template's code; a.k.a directory name
 */
export async function askTemplateMulti(
  args: AskLanguageArgs,
): Promise<string[]> {
  const choices = await checkbox({
    ...(await getInquiryArgs(args)),
    required: true,
  });

  return choices;
}

/**
 * Shows message asking what language the user's planning to use,
 * and gets the answer.
 * @returns Template's code; a.k.a directory name
 */
export async function askTemplate(
  args: AskLanguageArgs | string,
): Promise<string> {
  const choices = await select({
    ...(await getInquiryArgs(args)),
  });

  return choices;
}
