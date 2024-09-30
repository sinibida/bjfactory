import { Command } from "commander";

export interface CommandModule {
  next: (program: Command) => void;
}

export type ProblemState = "active" | "solved" | "later";

export interface ProblemConfig {
  id: number;
  name: string;
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
}
