import { diffWords } from "diff";
import { FileHandle } from "fs/promises";

export async function getDiff(outFile: FileHandle, ansFile: FileHandle) {
  // TODO: What about VERY large file?

  const out = (await outFile.readFile()).toString();
  const ans = (await ansFile.readFile()).toString();

  const changes = diffWords(out, ans, {
    ignoreWhitespace: false,
    ignoreCase: false,
  });

  return changes;
}
