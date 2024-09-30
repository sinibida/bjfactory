import { Command } from "commander";
import { CommandModule } from "../types/index.ts";
import Add from "./Add/index.ts";

const commands: CommandModule[] = [
  Add
]

export function registerCommands(program: Command) {
  commands.forEach(x => {
    x.next(program);
  })
}
