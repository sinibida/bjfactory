import axios from "axios";
import { Command } from "commander";
import fs from 'fs';

const program = new Command();

const client = axios.create({baseURL: "https://solved.ac/api/v3"});

program
  .command('add <problem>')
  .usage("2042")
  .description("create a problem folder on the working directory")
  .alias('a')
  .option("-l, --lang <codename>", "language to code")
  .action(async (problem, options) => {
    const problemId = problem;

    const response = await client.get("/problem/show", {params: {
      problemId,
    }})

    const lang = options.lang ?? "cpp";
    const problemName = response.data.titleKo;

    fs.mkdirSync(`./${problemId}-${lang}-${problemName}`)
  })

program
  .parse(process.argv);
