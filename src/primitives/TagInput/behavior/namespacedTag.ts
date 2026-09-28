/* @layer renderer-components @kind logic */
import { DEFAULT_HINT, SEPARATOR } from './tag-convention.constants';
import type { TagValidator } from '../TagInput.type';

const followsConvention = (tag: string): boolean => {
  const at = tag.indexOf(SEPARATOR);
  return at > 0 && at < tag.length - 1;
};

const namespacedTag: TagValidator = (tag) => followsConvention(tag) || DEFAULT_HINT;

export { namespacedTag };
