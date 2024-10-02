import { exec, spawn } from "child_process";
import { createWriteStream } from "fs";
import { FileHandle } from "fs/promises";
import path from "path";
import { stderr } from "process";
import { promisify } from "util";
import Logger from "../logger";

export async function withCwd(cwd: string, func: () => any) {
  const stash = process.cwd();
  process.chdir(cwd);

  await Promise.resolve(func());

  process.chdir(stash);
}

export function execCommand(cmd: string) {
  return promisify(exec)(cmd);
}

export function execPipedCommand(
  cmd: string,
  inFile: FileHandle,
  outFile: FileHandle,
  {
    resetOutFile = false,
  }: {
    resetOutFile?: boolean;
  }
) {
  return new Promise<undefined>((res, rej) => {
    const proc = spawn(cmd, {
      shell: true,
    });

    if (resetOutFile) outFile.truncate(0);

    const inStream = inFile.createReadStream();
    const outStream = outFile.createWriteStream();

    inStream.pipe(proc.stdin);

    proc.stdout.pipe(outStream);

    proc.stderr.pipe(stderr)

    proc.on("close", (code, signal) => {
      if (code === 0) {
        res(undefined);
      } else {
        rej(new Error(`Execution failed with error code ${code}`));
      }
    });

    proc.on("error", (err) => {
      throw err;
    });
  });
}
