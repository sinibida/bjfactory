import { exec, spawn } from "child_process";
import { FileHandle } from "fs/promises";
import { stderr } from "process";
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

function spawnPipedCommand(
  cmd: string,
  inStream: NodeJS.ReadableStream,
  outStream: NodeJS.WritableStream,
) {
  const proc = spawn(cmd, {
    shell: true,
  });

  inStream.pipe(proc.stdin);

  proc.stdout.pipe(outStream);

  proc.stderr.pipe(stderr);

  return proc;
}

export function execInteractiveCommand(cmd: string) {
  return new Promise<undefined>((res, rej) => {
    const proc = spawnPipedCommand(cmd, process.stdin, process.stdout);

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

export function execPipedCommand(
  cmd: string,
  inFile: FileHandle,
  outFile: FileHandle,
  {
    resetOutFile = false,
  }: {
    resetOutFile?: boolean;
  },
) {
  return new Promise<undefined>((res, rej) => {
    if (resetOutFile) outFile.truncate(0);

    const proc = spawnPipedCommand(
      cmd,
      inFile.createReadStream(),
      outFile.createWriteStream(),
    );

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
