/* @layer stories @kind logic */

const sameValue = (a: unknown, b: unknown): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
  return Object.is(a, b);
};

export { sameValue };
