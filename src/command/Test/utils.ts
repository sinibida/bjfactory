import colors from 'colors';
import { Change } from "diff";

export function printDiff(diff: Change[]) {
  // TODO: Use Logger
  diff.forEach(change => {
    if (change.added) {
      process.stdout.write(colors.bgGreen(change.value));
    } else if (change.removed) {
      process.stdout.write(colors.bgRed(change.value));
    } else {
      process.stdout.write(change.value);
    }
  })
}
