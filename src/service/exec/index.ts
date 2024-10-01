import { exec, spawn } from "child_process";
import { createWriteStream } from "fs";
import { FileHandle } from "fs/promises";
import path from "path";
import { promisify } from "util";

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
  outFile: FileHandle
) {
  return new Promise<undefined>((res, rej) => {
    const proc = spawn(path.resolve(cmd), {})
  
    const inStream = inFile.createReadStream();
    const outStream = outFile.createWriteStream();
  
    inStream.pipe(proc.stdin);

    proc.stdout.pipe(outStream);

    proc.on('close', (code, signal) => {
      if (code === 0) {
        res(undefined);
      } else {
        rej()
      }
    });

    proc.on('error', (err) => {
      throw err;
    })
  });
}
