#!/usr/bin/env node

import axios from "axios";
import { Command } from "commander";
import fs from "fs";
import { registerCommands } from "./command/index.ts";

const program = new Command();

registerCommands(program);

program.parse(process.argv);
