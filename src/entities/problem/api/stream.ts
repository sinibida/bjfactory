
import fs, { FileHandle } from "fs/promises";
import { ploblemModel } from "..";

type ProblemConfig = ploblemModel.ProblemConfig;

export async function withTestStreams(
  config: ProblemConfig,
  func: (inFile: FileHandle, outFile: FileHandle, ansFile: FileHandle) => void
) {
  const inFile = await fs.open(config.inFile, fs.constants.O_RDONLY);
  const outFile = await fs.open(
    config.outFile,
    fs.constants.O_RDWR | fs.constants.O_CREAT
  );
  const ansFile = await fs.open(config.ansFile, fs.constants.O_RDONLY);

  await Promise.resolve(func(inFile, outFile, ansFile));

  inFile.close();
  outFile.close();
  ansFile.close();
}
