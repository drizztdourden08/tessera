/* @layer renderer-components @kind logic */
import { foldChar } from './fold-char';
import type { FoldedMap } from './folded-map.type';

const foldedMap = (text: string): FoldedMap => {
  const map: FoldedMap = { folded: '', starts: [], ends: [] };
  let at = 0;
  for (const char of text) {
    const folded = foldChar(char);
    const units = { length: folded.length };
    map.starts.push(...Array.from(units, () => at));
    map.ends.push(...Array.from(units, () => at + char.length));
    map.folded += folded;
    at += char.length;
  }
  return map;
};

export { foldedMap };
