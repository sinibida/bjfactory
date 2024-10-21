import path from "path";
import fs from "fs/promises";

const languageTemplatePath = "./templates";

export function getRootPath() {
  if (require.main === undefined) {
    throw Error("Can't access the package directory.");
  }
  return path.resolve(require.main?.path, "../");
}

export const getRootTemplatePath = () =>
  path.resolve(getRootPath(), languageTemplatePath);

export async function* getAvailableLanguages() {
  const iter = await fs.opendir(getRootTemplatePath());
  for await (const dir of iter) {
    if (!dir.isDirectory()) continue;

    const dirStr = path.resolve(dir.parentPath, dir.name);

    yield path.basename(dirStr);
  }
}
