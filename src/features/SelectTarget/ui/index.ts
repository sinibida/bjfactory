import { configApi } from "@/entities/bjfConfig";
import { problemApi } from "@/entities/problem";
import Logger from "@/shared/api/logger";
import { input } from "@inquirer/prompts";
import path from "path";

export interface GetTargetArgs {
  keyword?: string;
}

function normalizeArgs(args: GetTargetArgs | string): GetTargetArgs {
  if (typeof args === "string") {
    return {
      keyword: args,
    };
  }
  return args;
}

async function askKeyword() {
  const inp = await input({
    message: "Enter search keyword.",
  });
  return inp;
}

async function getLastTarget() {
  const { lastTarget } = await configApi.readBJFConfig();
  return lastTarget;
}

async function maybeKeywordToDir(keyword: string | undefined): Promise<string> {
  let dir: string | null = null;
  while (dir === null) {
    if (keyword === undefined) keyword = await askKeyword();

    dir = await problemApi.search.searchProblemDirectory({
      keyword,
    });

    if (dir !== null) {
      break;
    } else {
      Logger.print(
        "Failed to find a problem folder with given search keyword: " + keyword,
      );
      keyword = undefined;
    }
  }
  return dir;
}

async function writeDirToConfig(dir: string) {
  await configApi.patchBJFConfig({
    lastTarget: path.relative(process.cwd(), path.resolve(dir)),
  });
}

export async function getTargetDirectory(args: GetTargetArgs | string) {
  args = normalizeArgs(args);

  if (args.keyword === undefined) {
    const lastTarget = await getLastTarget(); // is directory
    if (lastTarget !== null) {
      return lastTarget;
    }
  }

  const dir = await maybeKeywordToDir(args.keyword);

  await writeDirToConfig(dir);

  return dir;
}
