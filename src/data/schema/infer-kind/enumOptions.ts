/* @layer renderer-components @kind logic */
import { present } from './present';

const enumOptions = (values: readonly unknown[]): readonly string[] => {
  const seen = new Set<string>();
  for (const value of present(values)) if (typeof value === 'string') seen.add(value);
  return [...seen];
};

export { enumOptions };
