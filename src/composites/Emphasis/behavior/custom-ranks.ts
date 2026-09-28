/* @layer renderer-components @kind logic */
const customRanks = (count: number, sequence: readonly number[]): number[] => {
  const listed = sequence.filter((index, at) => index >= 0 && index < count && sequence.indexOf(index) === at);
  const rest = Array.from({ length: count }, (_unused, index) => index).filter((index) => !listed.includes(index));
  const ranks = new Array<number>(count).fill(0);
  [...listed, ...rest].forEach((index, rank) => {
    ranks[index] = rank;
  });
  return ranks;
};

export { customRanks };
