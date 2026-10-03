/* @layer renderer-components @kind logic */
import type { MatchPart } from '../SearchResultHit.type';

const splitMatch = (text: string, query: string): MatchPart[] => {
  const needle = query.trim().toLowerCase();
  const at = needle === '' ? -1 : text.toLowerCase().indexOf(needle);
  if (at === -1) return [{ text, match: false }];
  const end = at + needle.length;
  return [
    { text: text.slice(0, at), match: false },
    { text: text.slice(at, end), match: true },
    { text: text.slice(end), match: false },
  ].filter((part) => part.text !== '');
};

export { splitMatch };
