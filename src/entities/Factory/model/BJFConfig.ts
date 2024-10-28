export interface FactoryConfig {
  rootDir: string;
  lastTarget: string | null;
}

export const defaultFactoryConfig: FactoryConfig = {
  rootDir: ".",
  lastTarget: null,
};
