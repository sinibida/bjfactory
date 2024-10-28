import { problemApi } from "@/entities/Problem/index.js";
import { getTargetDirectory } from "@/features/SelectTarget";
import Logger from "@/shared/api/logger";
import { CommandModule } from "@/shared/types";

interface Options {
  // Insert option params here
}

async function Archive(target: string, options: Options) {
  const dir = await getTargetDirectory({ keyword: target });

  if (dir === null) {
    throw Error("Problem folder not found");
  }

  await problemApi.archive.moveToArchive(dir);

  Logger.print(`Problem '${dir}' is succesfully archived.`);
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
