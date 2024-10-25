import { loadTemplate } from "@/shared/api/fs/template";
import Logger from "@/shared/api/logger";
import { getProblemInfo } from "@/shared/api/solvecac/api/problem";
import { CommandModule } from "@/shared/types";
import { getFolderName } from "./logic";
import { ploblemModel, problemApi } from "@/entities/problem";
import { askTemplate } from "@/features/SelectTemplate";

type ProblemConfig = ploblemModel.ProblemConfig;

interface Options {
  lang: string;
}

async function Add(problem: string, options: Options) {
  const problemId = parseInt(problem, 10);
  if (Number.isNaN(problemId)) {
    throw Error("Invalid args");
  }

  const response = await getProblemInfo(problemId);

  const lang = options.lang ?? (await askTemplate("Select a template to use."));
  const problemName = response.titleKo;

  const folderName = getFolderName({
    id: problemId,
    selectedLang: lang,
    title: problemName,
  });

  await loadTemplate(folderName, lang);

  const initialConfig: Partial<ProblemConfig> = {
    id: problemId,
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
