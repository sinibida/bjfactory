export function ensureArray<T>(x: T | T[]) {
  if (Array.isArray(x)) {
    return x;
  } else {
    return [x];
  }
}