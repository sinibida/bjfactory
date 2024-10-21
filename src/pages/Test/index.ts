import { Option } from "commander";
import { getDiff } from "../../shared/api/diff/index.js";
import {
  execCommand,
  execPipedCommand,
  withCwd,
} from "../../shared/api/exec/index.js";
import { loadConfigWithDefault } from "../../shared/api/fs/problem/config.js";
import { searchProblemDirectories, searchProblemDirectory } from "../../shared/api/fs/problem/search.js";
import { withTestStreams } from "../../shared/api/fs/problem/stream.js";
import { CommandModule } from "../../shared/types/index.js";
import { printDiff } from "./utils.js";
import { ensureArray } from "../../shared/utils/typeutil.js";

interface Options {
  clean: boolean;
}

async function runCmds(cmd: string | string[]) {
  await Promise.all(ensureArray(cmd).map((x) => execCommand(x)));
}

async function Test(target: string, options: Options) {
  const dir = await searchProblemDirectory({
    keyword: target,
  });

  if (dir === null) {
    throw Error("Problem folder not found");
  }

  const config = await loadConfigWithDefault(dir);

  await withCwd(dir, async () => {
    await runCmds(config.build);

    await withTestStreams(config, async (inFile, outFile, _) => {
      await execPipedCommand(config.run, inFile, outFile, {
        resetOutFile: true,
      });
    });

    await withTestStreams(config, async (_, outFile, ansFile) => {
      const diff = await getDiff(outFile, ansFile);
      printDiff(diff);
    });

    if (options.clean) await runCmds(config.clean);
  });
}

export default {
  next(program) {
    program
      .command("test [target]")
      .usage("2042")
      .usage("2042-cpp")
      .description("")
      // .alias("")
      .option("-n, --no-clean", "")
      .action(Test);
  },
} satisfies CommandModule;
