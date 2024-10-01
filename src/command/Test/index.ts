import { getDiff } from "../../service/diff/index.js";
import {
  execCommand,
  execPipedCommand,
  withCwd,
} from "../../service/exec/index.js";
import { loadConfigWithDefault } from "../../service/fs/problem/config.js";
import { searchProblemDirectories } from "../../service/fs/problem/search.js";
import { withTestStreams } from "../../service/fs/problem/stream.js";
import { CommandModule } from "../../types/index.js";
import { ensureArray } from "./logic.js";
import { printDiff } from "./utils.js";

interface Options {
  // Insert option params here
}

async function Test(target: string, options: Options) {
  const dir = await searchProblemDirectories({
    keyword: target,
  }).next();

  if (dir.done) {
    throw Error("Problem folder not found");
  }

  const dirStr = dir.value;

  const config = await loadConfigWithDefault(dirStr);

  await withCwd(dirStr, async () => {
    await Promise.all(ensureArray(config.build).map((x) => execCommand(x)));

    await withTestStreams(config, async (inFile, outFile, ansFile) => {
      await execPipedCommand(config.run, inFile, outFile);
      const diff = await getDiff(outFile, ansFile);
      printDiff(diff);
    });
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
      // .option("", "")
      .action(Test);
  },
} satisfies CommandModule;
