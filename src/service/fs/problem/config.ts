import fs from "fs/promises";
import path from "path";
import { ProblemConfig } from "../../../types";
import { isValidProblemConfig } from "../../../impls/ProblemConfig";

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

  return obj as ProblemConfig;
}

export async function saveConfig(
  dir: string,
  config: ProblemConfig,
  options: {
    jsonSpace: number;
  }
) {
  const { jsonSpace }: typeof options = {
    ...options,
    jsonSpace: 2,
  };

  const stringified = JSON.stringify(config, undefined, jsonSpace);
  await fs.writeFile(getConfigPath(dir), stringified, {
    encoding: "utf8",
    flush: true,
    flag: fs.constants.O_WRONLY | fs.constants.O_CREAT,
  });
}
