import { loadTemplate } from "@/shared/api/fs/template";
import Logger from "@/shared/api/logger";
import { getProblemInfo } from "@/shared/api/solvecac/api/problem";
import { CommandModule } from "@/shared/types";
import { getFolderName, getProblemFolderName } from "./logic";
import { ploblemModel, problemApi } from "@/entities/problem";
import { askTemplate } from "@/features/SelectTemplate";

type ProblemConfig = ploblemModel.ProblemConfig;

interface Options {
  lang: string;
}

async function Add(problem: string, options: Options) {
  const lang = options.lang ?? (await askTemplate("Select a template to use."));

  // TODO: support different kind of 'problem input'
  const { problemName, folderName } = await getProblemFolderName(problem, lang);

  await loadTemplate(folderName, lang);

  const initialConfig: Partial<ProblemConfig> = {
    id: folderName,
    name: problemName,
    state: "active",
  };

  await problemApi.config.editConfig(
    (config) => ({
      ...config,
      ...initialConfig,
    }),
    folderName,
  );

  Logger.print(`Folder '${folderName}' succesfully created.`);
}

export default {
  next(program) {
    program
      .command("add [problem]")
      .usage("2042")
      .description("create a problem folder on the working directory")
      .alias("a")
      .option("-l, --lang <codename>", "language to code")
      .action(Add);
  },
} satisfies CommandModule;
