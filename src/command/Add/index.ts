import http from "../../service/solvecac/client.ts";
import Logger from "../../service/logger/index.ts";
import { CommandModule, ProblemConfig } from "../../types/index.ts";
import { getFolderName, processProblemName } from "./logic.ts";
import { loadTemplate } from "../../service/fs/template.ts";
import { getProblemInfo } from "../../service/solvecac/api/problem.ts";
import { editConfigFile } from "../../service/fs/problem/compose.ts";

interface Options {
  lang: string;
}

async function Add(problem: number, options: Options) {
  const problemId = problem;

  const response = await getProblemInfo(problemId);

  // TODO: prog. lang inquiry

  const lang = options.lang ?? "cpp";
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

  await editConfigFile(
    (config) => ({
      ...config,
      ...initialConfig,
    }),
    folderName
  );

  Logger.print(`Folder '${folderName}' succesfully created.`);
}

export default {
  next(program) {
    program
      .command("add <problem>")
      .usage("2042")
      .description("create a problem folder on the working directory")
      .alias("a")
      .option("-l, --lang <codename>", "language to code")
      .action(Add);
  },
} satisfies CommandModule;
