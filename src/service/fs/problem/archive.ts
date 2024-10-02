import fs from "fs/promises";
import path from "path";
import { isAccessible } from "../utils";

const archiveDir = "./archive";

/**
 * Create an archive folder when it doesn't exist.
 */
export async function ensureArchiveFoler() {
  if (!await isAccessible(archiveDir)) {
    await fs.mkdir(archiveDir);
  }
}

export async function moveToArchive(dir: string) {
  // TODO 중복 처리
  await ensureArchiveFoler();

  await fs.rename(dir, path.join(archiveDir, path.basename(dir)));
}
