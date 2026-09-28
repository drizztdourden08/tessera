/* @layer renderer-components @kind logic */
import { isContainer } from './is-container';

const getPath = (obj: unknown, path: string): unknown => {
  if (!path) return obj;
  let current: unknown = obj;
  for (const segment of path.split('.')) {
    if (!isContainer(current)) return undefined;
    current = current[segment];
  }
  return current;
};

export { getPath };
