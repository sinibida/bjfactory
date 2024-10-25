import { ploblemModel } from "@/entities/problem";

type ProblemConfig = ploblemModel.ProblemConfig;

/**
 * Checks if the value provided meets the {@linkcode ProblemConfig} type.
 */
export function isPartialProblemConfig(
  obj: any,
): obj is Partial<ProblemConfig> {
  return true; // TODO
}

export function isProblemConfigValid(
  config: Partial<ProblemConfig>,
  onFail?: (message: string) => void,
) {
  return true; // TODO
}

/**
 * Checks if the value provided is VALID problem config.
 */
export function isValidProblemConfig(
  obj: any,
  onFail?: (message: string) => void,
): obj is Partial<ProblemConfig> {
  if (isPartialProblemConfig(obj)) {
    if (isProblemConfigValid(obj, onFail)) {
      return true;
    }
  }
  return false;
}

export const defaultProblemConfig: ProblemConfig = Object.freeze<ProblemConfig>(
  {
    id: "foo",
    name: "undefined",
    state: "active",
    inFile: "in.txt",
    outFile: "out.txt",
    ansFile: "ans.txt",
    build: [],
    run: "",
    clean: [],
  },
);
