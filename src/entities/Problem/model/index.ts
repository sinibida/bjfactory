import { BaseProblemMetadata } from "@/shared/types";

export type ProblemState = "active" | "solved" | "later";

export interface Problem {
  title: string;
  metadata: BaseProblemMetadata | null;
  /**
   * @default 'active'
   */
  state: ProblemState;
  /**
   * @default in.txt
   */
  inFile: string;
  /**
   * @default out.txt
   */
  outFile: string;
  /**
   * @default ans.txt
   */
  ansFile: string;
  /**
   * A command or a list of commands to build the code.
   */
  build: string | string[];
  /**
   * A command to exercute the built executable, or interpret the script.
   *
   * The contents of `inFile` and `outFile` is piped through this command.
   */
  run: string;
  /**
   * A command to run after the test is done.
   */
  clean: string | string[];
}
