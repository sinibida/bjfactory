import { Command } from "commander";
import { CommandModule } from "../../shared/types/index.ts";
import Add from "../../pages/Add/index.ts";
import Test from "../../pages/Test/index.ts";
import Archive from "../../pages/Archive/index.ts";
import Init from "../../pages/Init/index.ts";

const commands: CommandModule[] = [
  Add,
  Test,
  Archive,
  Init
]

export function registerCommands(program: Command) {
  commands.forEach(x => {
    x.next(program);
  })
}
