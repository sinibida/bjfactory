import http from "../../service/http/client.ts";
import Logger from "../../service/logger/index.ts";
import { CommandModule } from "../../types/index.ts";
import { getFolderName, processProblemName } from "./logic.ts";
import { loadTemplate } from "../../service/fs/template.ts";

interface Options {
  lang: string;
}

async function Add(problem: number, options: Options) {
  const problemId = problem;

  const response = await http.get("/problem/show", {
    params: {
      problemId,
    },
  });

  // TODO: prog. lang inquiry

  const lang = options.lang ?? "cpp";
  const problemName = response.data.titleKo;

  const folderName = getFolderName({
    id: problemId,
    selectedLang: lang,
    title: problemName,
  });

  await loadTemplate(folderName, lang);

  Logger.print(`Folder '${folderName}' succesfully created.`)
}

export default {
  next(program) {
    program.command("add <problem>")
      .usage("2042")
      .description("create a problem folder on the working directory")
      .alias("a")
      .option("-l, --lang <codename>", "language to code")
      .action(Add);
  }
} satisfies CommandModule
