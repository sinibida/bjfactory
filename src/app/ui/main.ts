
import { Command } from "commander";
import { registerCommands } from "./registerCommands.ts";

export default function main() {
  const program = new Command();
  
  registerCommands(program);
  
  program.parse(process.argv);
  
}