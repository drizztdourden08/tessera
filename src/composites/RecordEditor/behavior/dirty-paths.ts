/* @layer renderer-components @kind logic */
import { getPath } from '../../../data/schema/path';
import { toJson } from '../../field-kits/toJson';

const hasPathChanged = (original: unknown, working: unknown, path: string): boolean => {
  const before = getPath(original, path);
  const after = getPath(working, path);
  if (before === after) return false;
  return toJson(before) !== toJson(after);
};

export { hasPathChanged };
