/* @layer renderer-components @kind util */
import type { HighlightPart } from './highlight-parts.type';

const highlightParts = (text: string, query: string): HighlightPart[] => {
  const needle = query.trim().toLowerCase();
  if (needle === '') return [{ text, match: false }];
  const haystack = text.toLowerCase();
  const parts: HighlightPart[] = [];
  let from = 0;
  for (let at = haystack.indexOf(needle); at !== -1; at = haystack.indexOf(needle, from)) {
    if (at > from) parts.push({ text: text.slice(from, at), match: false });
    parts.push({ text: text.slice(at, at + needle.length), match: true });
    from = at + needle.length;
  }
  if (from < text.length) parts.push({ text: text.slice(from), match: false });
  return parts;
};

export { highlightParts };
