import { BJFConfig, InitBJFParams } from "../../types";

export function fromInitBJFParamsToBJFConfig(data: InitBJFParams) {
  return {
    rootDir: data.rootDir,
    selectedLanguages: data.selectedLanguages
  } satisfies BJFConfig
}