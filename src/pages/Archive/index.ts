import { CommandModule } from "../../shared/types/index.js";
import Logger from "../../shared/api/logger/index.js";
import { searchProblemDirectory } from "../../shared/api/fs/problem/search.js";
import { moveToArchive } from "../../shared/api/fs/problem/archive.js";

interface Options {
  // Insert option params here
}

async function Archive(target: string, options: Options) {
  const dir = await searchProblemDirectory({
    keyword: target,
  });

  if (dir === null) {
    throw Error("Problem folder not found");
  }

  await moveToArchive(dir);

  Logger.print(`Problem '${dir}' is succesfully archived.`)
}

export default {
  next(program) {
    program
      .command("archive [target]")
      .usage("")
      .description("")
      // .alias("")
      // .option("", "")
      .action(Archive);
  },
} satisfies CommandModule;
