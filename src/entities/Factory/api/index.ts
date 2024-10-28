import fs from "fs/promises";
import path from "path";
import { Factory } from "..";

const configFileName = "factory.json";

function getConfigPath(dir: string) {
  return path.resolve(dir, configFileName);
}

export async function writeFactoryJson(config: Factory, rootDir: string = ".") {
  const stringified = JSON.stringify(config, undefined, 2); // TODO: better json editting
  await fs.writeFile(getConfigPath(rootDir), stringified, {
    encoding: "utf8",
    flush: true,
    flag: fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC,
  });
}

export async function readFactoryJson(rootDir: string = "."): Promise<Factory> {
  const content = await fs.readFile(getConfigPath(rootDir), {
    encoding: "utf8",
    flag: fs.constants.O_RDONLY,
  });

  const obj = JSON.parse(content); // Type check
  return obj as Factory;
}

export async function patchFactoryJson(
  config: Partial<Factory>,
  rootDir?: string,
): Promise<Factory> {
  let obj = await readFactoryJson(rootDir);
  obj = {
    ...obj,
    ...config,
  };
  await writeFactoryJson(obj);
  return obj;
}
