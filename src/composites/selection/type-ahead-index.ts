/* @layer renderer-components @kind logic */
import type { TypeAheadInput } from './selection.type';

const findFrom = (input: TypeAheadInput, text: string, first: number): number => {
  const { count, labelAt } = input;
  const wanted = text.toLowerCase();
  for (let step = 0; step < count; step += 1) {
    const at = (first + step) % count;
    if (labelAt(at).trim().toLowerCase().startsWith(wanted)) return at;
  }
  return -1;
};

const typeAheadIndex = (input: TypeAheadInput): number => {
  const { count, from, text } = input;
  if (count <= 0 || text === '') return -1;
  const found = findFrom(input, text, text.length === 1 ? from + 1 : Math.max(0, from));
  if (found >= 0) return found;
  const first = text.charAt(0);
  return text.split('').every((char) => char === first) ? findFrom(input, first, from + 1) : -1;
};

export { typeAheadIndex };
