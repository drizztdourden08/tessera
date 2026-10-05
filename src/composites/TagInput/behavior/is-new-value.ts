/* @layer renderer-components @kind logic */
import { normalizeTag } from './tag-values';

const isNewValue = (raw: string, suggestions: readonly string[]): boolean => {
  const tag = normalizeTag(raw);
  return tag !== '' && !suggestions.some((known) => known.toLowerCase() === tag.toLowerCase());
};

export { isNewValue };
