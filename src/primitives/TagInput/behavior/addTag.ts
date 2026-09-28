/* @layer renderer-components @kind logic */
import { normalizeTag } from './tag-values';

const addTag = (value: readonly string[], raw: string): readonly string[] => {
  const tag = normalizeTag(raw);
  if (tag === '' || value.includes(tag)) return value;
  return [...value, tag];
};

export { addTag };
