import { loadTemplate } from "@/shared/api/fs/template";
import Logger from "@/shared/api/logger";
import { getProblemInfo } from "@/shared/api/solvecac/api/problem";
import { BaseProblemMetadata, CommandModule } from "@/shared/types";
import { getProblemFolderName } from "./logic";
import { Problem, problemApi } from "@/entities/Problem";
import { askTemplate } from "@/features/SelectTemplate";
import {
  fetchProblemData,
  getFolderName,
  rawNameToId,
  splitProblemString,
} from "./lib";
import { findProblemMetadataModule } from "@/entities/ProblemMetadata";

interface Options {
  lang: string;
}

async function Add(problem: string, options: Options) {
  const lang = options.lang ?? (await askTemplate("Select a template to use."));

  const splitProblem = splitProblemString(problem);

  const { problemId, metadata, name } = await fetchProblemData(splitProblem);

  const folderName = getFolderName(problemId, lang);
  await loadTemplate(folderName, lang);

  const initialConfig: Partial<Problem> = {
    metadata,
    title: name,
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
