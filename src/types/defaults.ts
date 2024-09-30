import { ProblemConfig } from ".";

export const defaultProblemConfig: ProblemConfig = Object.freeze<ProblemConfig>(
  {
    id: 0,
    name: "undefined",
    state: "active",
    inFile: 'in.txt',
    outFile: 'out.txt',
    ansFile: 'ans.txt',
    build: [],
    run: "",
  }
);
