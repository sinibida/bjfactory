import { CommandModule } from "@/shared/types";
import { initBJF } from "./lib/bjf";
import { prettyRelativePath } from "./lib/logic";
import { askLanguages, recommendAdd } from "./ui/ui";

interface Options {
  lang: string[];
}

async function Init(directory: string | undefined, options: Options) {
  const selectedLanguages: string[] = options.lang ?? (await askLanguages());
  const rootDir = prettyRelativePath(directory ?? process.cwd());

  await initBJF({
    selectedLanguages,
    rootDir,
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
