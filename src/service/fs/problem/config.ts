import fs from "fs/promises";
import path from "path";
import { isProblemConfig } from "../../../types/impls/ProblemConfig";
import { ProblemConfig } from "../../../types";

const configFileName = "problem.json";

function getConfigPath(dir: string) {
  return path.resolve(dir, configFileName);
}

export async function loadConfig(dir: string) {
  const content = (await fs.readFile(getConfigPath(dir))).toString("utf8");

  const obj = JSON.parse(content);

  isProblemConfig(obj, () => {
    throw Error("Parse failed:"); // TODO: Error Details
  });

  return obj as ProblemConfig;
}

export async function saveConfig(dir: string, config: ProblemConfig) {
  await fs.writeFile(getConfigPath(dir), JSON.stringify(config), {
    encoding: "utf8",
    flush: true,
    flag: fs.constants.O_WRONLY | fs.constants.O_CREAT
  });
}
