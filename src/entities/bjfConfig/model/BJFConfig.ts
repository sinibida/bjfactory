export interface BJFConfig {
  selectedLanguages: string[];
  rootDir: string;
  lastTarget: string | null;
}

export const defaultBJFConfig: BJFConfig = {
  rootDir: ".",
  selectedLanguages: [],
  lastTarget: null,
};
