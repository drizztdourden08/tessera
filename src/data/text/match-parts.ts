/* @layer renderer-components @kind logic */
import { foldedMap } from './folded-map';
import { queryWords } from './query-words';
import { wordRanges } from './word-ranges';
import type { FoldedMap } from './folded-map.type';
import type { MatchPart, TextRange } from './match-part.type';

const sourceRange = (map: FoldedMap, [start, end]: TextRange, length: number): TextRange => {
  const next = map.starts[end];
  const last = map.ends[end - 1] ?? length;
  return [map.starts[start] ?? 0, next === undefined ? length : Math.max(next, last)];
};

const matchParts = (text: string, query: string): MatchPart[] => {
  const words = queryWords(query);
  const map = foldedMap(text);
  const parts: MatchPart[] = [];
  let from = 0;
  for (const range of wordRanges(map.folded, words)) {
    const [found, end] = sourceRange(map, range, text.length);
    const start = Math.max(found, from);
    if (start > from) parts.push({ text: text.slice(from, start), match: false });
    parts.push({ text: text.slice(start, end), match: true });
    from = end;
  }
  if (from < text.length || parts.length === 0) parts.push({ text: text.slice(from), match: false });
  return parts;
};

export { matchParts };
