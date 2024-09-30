import { Command } from "commander";

const program = new Command();

program
  .command('add <problem>')
  .usage("2042")
  .description("create a problem folder on the working directory")
  .alias('a')
  .option("-l, --lang <codename>", "language to code")
  .action((problem, options) => {
    console.log(problem, options)
  })

program
  .parse(process.argv);
