/* @layer renderer-components @kind logic */
const runLength = (text: string, char: string, side: 'start' | 'end'): number => {
  let count = 0;
  while (count < text.length && text.charAt(side === 'start' ? count : text.length - 1 - count) === char) count += 1;
  return count;
};

export { runLength };
