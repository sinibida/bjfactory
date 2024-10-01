import { ProblemConfig } from "../..";

export function isProblemConfig(
  obj: any,
  onError?: ({}) => void
): obj is ProblemConfig {
  return true; // TODO
}

export const defaultProblemConfig: ProblemConfig = Object.freeze<ProblemConfig>(
  {
    id: 0,
    name: "undefined",
    state: "active",
    inFile: "in.txt",
    outFile: "out.txt",
    ansFile: "ans.txt",
    build: [],
    run: "",
    clean: [],
  }
);
