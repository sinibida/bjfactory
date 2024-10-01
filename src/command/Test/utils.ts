import colors from 'colors';
import { Change } from "diff";

export function printDiff(diff: Change[]) {
  // TODO: Use Logger
  diff.forEach(change => {
    if (change.added) {
      console.log(colors.green(change.value));
    } else if (change.removed) {
      console.log(colors.red(change.value));
    } else {
      console.log(change.value);
    }
  })
}
