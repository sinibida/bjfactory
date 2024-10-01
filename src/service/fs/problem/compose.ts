import { ProblemConfig } from "../../../types";
import { loadConfig, saveConfig } from "./config";

export async function editConfigFile(
  modify: (config: Partial<ProblemConfig>) => Partial<ProblemConfig>,
  dir: string
) {
  await saveConfig(dir, modify(await loadConfig(dir)));
}
