import fs from "fs/promises";
import path from "path";

export function keywordCheck(targetPath: string, keyword: string) {
  return targetPath.startsWith(keyword);
}

export async function* searchProblemDirectories(props: {
  /**
   * keyword to serach
   */
  keyword: string;
  /**
   * directory to search onto.
   * @default Working directory.
   */
  searchSrc?: string;
  /**
   * @default false
   */
  recursive?: boolean;
}) {
  const {
    keyword,
    searchSrc: searchSrcProp,
    recursive,
  }: typeof props = {
    recursive: false,
    ...props,
  };

  const searchSrc =
    searchSrcProp === undefined ? process.cwd() : path.resolve(searchSrcProp);

  if (recursive) {
    throw Error("not implemented");
  }

  const iter = await fs.opendir(searchSrc);
  for await (const dir of iter) {
    if (!dir.isDirectory()) continue;

    const dirStr = path.resolve(dir.parentPath, dir.name);

    if (keywordCheck(dirStr, keyword)) {
      yield dirStr;
    }
  }
  await iter.close();
}
