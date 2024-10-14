import colors from 'colors';
import { Change } from "diff";

function normalizeDiffWord(word: string) {
  if (/^[\n\r]+$/.test(word)) {
    return word.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  } 

  return word;
}

export function printDiff(diff: Change[]) {
  // TODO: Use Logger
  diff.forEach(change => {
    const normValue = normalizeDiffWord(change.value);
    if (change.added) {
      process.stdout.write(colors.bgGreen(normValue));
    } else if (change.removed) {
      process.stdout.write(colors.bgRed(normValue));
    } else {
      process.stdout.write(normValue);
    }
  })
}
