import { Factory, defaultFactory } from "@/entities/Factory";

export interface InitBJFParams {
  selectedLanguages: string[];
  rootDir: string;
}

export function fromInitBJFParamsToBJFConfig(data: InitBJFParams) {
  return {
    ...defaultFactory,
    rootDir: data.rootDir,
  } satisfies Factory;
}
