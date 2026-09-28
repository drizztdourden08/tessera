/* @layer renderer-components @kind logic */
import { normalizeTag } from './tag-values';

const resolveCommit = (raw: string, suggestions: readonly string[]): string | null => {
  const tag = normalizeTag(raw);
  if (tag === '') return null;
  return suggestions.find((known) => known.toLowerCase() === tag.toLowerCase()) ?? tag;
};

export { resolveCommit };
