import { CommandModule } from "../../types/index.js";
import Logger from "../../service/logger/index.js";
import { searchProblemDirectory } from "../../service/fs/problem/search.js";
import { moveToArchive } from "../../service/fs/problem/archive.js";

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
