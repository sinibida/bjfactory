import fs from "fs/promises";
import path from "path";
import { defaultProblemConfig, isValidProblemConfig } from "../lib";
import { Problem } from "../model";

const configFileName = "problem.json";

function getConfigPath(dir: string) {
  return path.resolve(dir, configFileName);
}

export async function loadConfig(dir: string) {
  const content = (await fs.readFile(getConfigPath(dir))).toString("utf8");

  const obj = JSON.parse(content);

  isValidProblemConfig(obj, () => {
    throw Error("Parse failed:"); // TODO: Error Details
  });

  return obj as Partial<Problem>;
}

export async function loadConfigWithDefault(dir: string): Promise<Problem> {
  const partial = await loadConfig(dir);

  return {
    ...defaultProblemConfig,
    ...partial,
  };
}

export async function saveConfig(
  dir: string,
  config: Partial<Problem>,
  options: Partial<{
    jsonSpace: number;
  }> = {},
) {
  const { jsonSpace }: Required<typeof options> = {
    ...options,
    jsonSpace: 2,
  };

  const stringified = JSON.stringify(config, undefined, jsonSpace);
  await fs.writeFile(getConfigPath(dir), stringified, {
    encoding: "utf8",
    flush: true,
    flag: fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC,
  });
}

export async function editConfig(
  modify: (config: Partial<Problem>) => Partial<Problem>,
  dir: string,
) {
  await saveConfig(dir, modify(await loadConfig(dir)));
}
