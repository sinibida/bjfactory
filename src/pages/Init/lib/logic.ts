import path from "path";

export function prettyRelativePath(dir: string) {
  // TODO: too many '..' -> use absolute instead
  const rel = path.relative(process.cwd(), path.resolve(dir));

  if (rel === "") return "."
  
  return rel;
}