import { Command } from "commander";

// TODO: Split Types

export interface CommandModule {
  next: (program: Command) => void;
}
