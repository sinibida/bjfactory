import { Command } from "commander";

export interface CommandModule {
  next: (program: Command) => void;
}

export type ProblemState = "active" | "solved" | "later";

export interface ProblemConfig {
  id: number;
  name: string;
  state: ProblemState;
}
