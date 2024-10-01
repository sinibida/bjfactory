import fs from "fs/promises";
import path from "path";
import { isAccessible } from "./utils";

const templatePath = "templates";

/**
 *
 * @param probPath Relative path to the problem folder
 * @param templateCode Code of the template (ex: `cpp`)
 */
export async function loadTemplate(probPath: string, templateCode: string) {
  if (!(await isAccessible(probPath))) await fs.mkdir(probPath);

  await fs.cp(
    path.resolve(templatePath, templateCode),
    path.resolve(probPath),
    { recursive: true }
  );
}
