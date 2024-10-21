import { BJFConfig } from "@/entities/config/model/BJFConfig";

export interface InitBJFParams {
  selectedLanguages: string[];
  rootDir: string;
}

export function fromInitBJFParamsToBJFConfig(data: InitBJFParams) {
  return {
    rootDir: data.rootDir,
    selectedLanguages: data.selectedLanguages,
  } satisfies BJFConfig;
}
