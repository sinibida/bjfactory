import { BJFConfig } from "@/entities/bjfConfig/model/BJFConfig";
import fs from "fs/promises";
import path from "path";

const configFileName = "factory.json";

function getConfigPath(dir: string) {
  return path.resolve(dir, configFileName);
}

export async function writeBJFConfig(config: BJFConfig, rootDir: string = ".") {
  const stringified = JSON.stringify(config, undefined, 2); // TODO: better json editting
  await fs.writeFile(getConfigPath(rootDir), stringified, {
    encoding: "utf8",
    flush: true,
    flag: fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC,
  });
}

export async function readBJFConfig(rootDir: string = "."): Promise<BJFConfig> {
  const content = await fs.readFile(getConfigPath(rootDir), {
    encoding: "utf8",
    flag: fs.constants.O_RDONLY,
  });

  const obj = JSON.parse(content); // Type check
  return obj as BJFConfig;
}

export async function patchBJFConfig(
  config: Partial<BJFConfig>,
  rootDir?: string,
): Promise<BJFConfig> {
  let obj = await readBJFConfig(rootDir);
  obj = {
    ...obj,
    ...config,
  };
  await writeBJFConfig(obj);
  return obj;
}
