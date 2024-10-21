import { BJFConfig } from "@/entities/config/model/BJFConfig";
import fs from "fs/promises";
import path from "path";

const configFileName = "factory.json";

function getConfigPath(dir: string) {
  return path.resolve(dir, configFileName);
}

export async function writeBJFConfig(config: BJFConfig, rootDir: string) {
  const stringified = JSON.stringify(config, undefined, 2); // TODO: better json editting
  await fs.writeFile(getConfigPath(rootDir), stringified, {
    encoding: "utf8",
    flush: true,
    flag: fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC,
  });
}
