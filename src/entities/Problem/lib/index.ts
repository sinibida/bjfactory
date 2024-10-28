import { Problem } from "../model";

/**
 * Checks if the value provided meets the {@linkcode Problem} type.
 */
export function isPartialProblemConfig(obj: any): obj is Partial<Problem> {
  return true; // TODO
}

export function isProblemConfigValid(
  config: Partial<Problem>,
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
): obj is Partial<Problem> {
  if (isPartialProblemConfig(obj)) {
    if (isProblemConfigValid(obj, onFail)) {
      return true;
    }
  }
  return false;
}

export const defaultProblemConfig: Problem = Object.freeze<Problem>({
  metadata: null,
  title: "Problem",
  state: "active",
  inFile: "in.txt",
  outFile: "out.txt",
  ansFile: "ans.txt",
  build: [],
  run: "",
  clean: [],
});
