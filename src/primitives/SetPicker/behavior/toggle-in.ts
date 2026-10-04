/* @layer renderer-components @kind logic */
const toggleIn = (options: readonly string[], value: readonly string[], option: string, on: boolean): string[] => {
  const next = new Set(value);
  if (on) next.add(option);
  else next.delete(option);
  return options.filter((entry) => next.has(entry));
};

export { toggleIn };
