import fs from "fs/promises";
import path from "path";
import { isAccessible } from "./utils";
import { getRootTemplatePath } from "./rootpath";

const templatePath = "templates";

export const getTemplatePath = () => path.resolve(templatePath);

/**
 *
 * @param probPath Relative path to the problem folder
 * @param templateCode Code of the template (ex: `cpp`)
 */
export async function loadTemplate(probPath: string, templateCode: string) {
  if (!(await isAccessible(probPath))) await fs.mkdir(probPath);

  await fs.cp(
    path.resolve(getTemplatePath(), templateCode),
    path.resolve(probPath),
    { recursive: true },
  );
}

export async function installTemplates(templates: string[]) {
  await Promise.all(templates.map(installTemplate));
}

export async function installTemplate(template: string) {
  await fs.cp(
    path.resolve(getRootTemplatePath(), template),
    path.resolve(getTemplatePath(), template),
    { recursive: true },
  );
}
