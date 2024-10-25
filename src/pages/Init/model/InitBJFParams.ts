import { BJFConfig, defaultBJFConfig } from "@/entities/bjfConfig";

export interface InitBJFParams {
  selectedLanguages: string[];
  rootDir: string;
}

export function fromInitBJFParamsToBJFConfig(data: InitBJFParams) {
  return {
    ...defaultBJFConfig,
    rootDir: data.rootDir,
    selectedLanguages: data.selectedLanguages,
  } satisfies BJFConfig;
}
