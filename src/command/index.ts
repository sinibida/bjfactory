import { Command } from "commander";
import { CommandModule } from "../types/index.ts";
import Add from "./Add/index.ts";
import Test from "./Test/index.ts";
import Archive from "./Archive/index.ts";

const commands: CommandModule[] = [
  Add,
  Test,
  Archive
]

export function registerCommands(program: Command) {
  commands.forEach(x => {
    x.next(program);
  })
}
