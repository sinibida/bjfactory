import axios from "axios";
import { Command } from "commander";
import fs from "fs";
import { registerCommands } from "./src/command/index.js";

const program = new Command();

registerCommands(program);

program.parse(process.argv);
