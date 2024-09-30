import { Command } from "commander";
import { CommandModule } from "../types/index.js";
import Add from "./Add/index.js";

const commands: CommandModule[] = [
  Add
]

export function registerCommands(program: Command) {
  commands.forEach(x => {
    x.next(program);
  })
}
