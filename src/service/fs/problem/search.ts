import fs from 'fs/promises'
import path from 'path';

export function keywordCheck(targetPath: string, keyword: string) {
  return targetPath.startsWith(keyword);
}

export async function* searchProblemDirectories(
  {
    keyword,
    searchSrc: searchSrcProp,
    recursive,
  }: {
    /**
     * keyword to serach
     */
    keyword: string,
    /**
     * directory to search onto.
     * @default Working directory.
     */
    searchSrc: string,
    recursive: boolean,
  }
) {
  if (recursive) {
    throw Error("not implemented");
  }

  const searchSrc = path.resolve(searchSrcProp) ?? process.cwd();

  const iter = await fs.opendir(searchSrc)
  for await (const dir of iter) {
    if (!dir.isDirectory()) continue;

    const dirStr = path.resolve(dir.parentPath, dir.name);

    if (keywordCheck(dirStr, keyword)) {
      yield dirStr;
    }
  }
  await iter.close();
}
