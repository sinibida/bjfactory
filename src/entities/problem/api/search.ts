import fs from "fs/promises";
import path from "path";

export function doesPathMatchKeyword(targetPath: string, keyword: string) {
  return path.basename(targetPath).startsWith(keyword);
}

export interface ProblemDirectorySearch {
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
}

export async function searchProblemDirectory(props: ProblemDirectorySearch) {
  const dir = await searchProblemDirectories(props).next()

  if (dir.done) {
    return null;
  }

  const dirStr = dir.value;

  return dirStr;
}

export async function* searchProblemDirectories(props: ProblemDirectorySearch) {
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

    if (doesPathMatchKeyword(dirStr, keyword)) {
      yield dirStr;
    }
  }
  // await iter.close();
}
