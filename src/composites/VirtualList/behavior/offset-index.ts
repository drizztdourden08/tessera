/* @layer renderer-components @kind logic */
const offsetIndex = (offsets: readonly number[], at: number): number => {
  const last = offsets.length - 2;
  if (last <= 0) return 0;
  let low = 0;
  let high = last;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((offsets[middle] ?? 0) <= at) low = middle;
    else high = middle - 1;
  }
  return low;
};

export { offsetIndex };
