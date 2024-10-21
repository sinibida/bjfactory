export function ensureArray<T>(x: T | T[]) {
  if (Array.isArray(x)) {
    return x;
  } else {
    return [x];
  }
}

export async function generatorToArray<T>(
  gen: AsyncGenerator<T, unknown, unknown>,
) {
  let arr: T[] = [];
  for await (const x of gen) {
    arr.push(x);
  }
  return arr;
}
