import { CommandModule } from "../../types/index.js";
import Logger from "../../service/logger/index.js";
import { askLanguages, recommendAdd } from "./ui.js";
import { initBJF } from "../../service/compose/bjf.js";
import { Option } from "commander";
import { prettyRelativePath } from "./logic.js";

interface Options {
  lang: string[];
}

async function Init(directory: string | undefined, options: Options) {
  const selectedLanguages: string[] = options.lang ?? (await askLanguages());
  const rootDir = prettyRelativePath(directory ?? process.cwd());

  await initBJF({
    selectedLanguages,
    rootDir
  });

  recommendAdd();
}

export default {
  next(program) {
    program
      .command("init [directory]")
      .usage("-l cpp java [directory]")
      .description("")
      // .alias("")
      .option("-l, --lang <languages...>", "Languages to use.")
      .action(Init);
  },
} satisfies CommandModule;
