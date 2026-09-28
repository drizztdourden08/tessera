/* @layer renderer-components @kind logic */
const nextRandom = (state: { value: number }): number => {
  state.value = (state.value + 0x6d2b79f5) >>> 0;
  let mixed = Math.imul(state.value ^ (state.value >>> 15), 1 | state.value);
  mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
  return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
};

const randomRanks = (count: number, seed: number): number[] => {
  const state = { value: seed >>> 0 };
  const ranks = Array.from({ length: count }, (_unused, index) => index);
  for (let index = count - 1; index > 0; index -= 1) {
    const swap = Math.floor(nextRandom(state) * (index + 1));
    [ranks[index], ranks[swap]] = [ranks[swap] ?? index, ranks[index] ?? swap];
  }
  return ranks;
};

export { randomRanks };
