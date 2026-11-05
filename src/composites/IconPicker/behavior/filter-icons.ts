/* @layer renderer-components @kind logic */
import type { IconName } from '../../../primitives/Icon';

const filterIcons = (names: readonly IconName[], query: string): readonly IconName[] => {
  const needle = query.trim().toLowerCase();
  return needle ? names.filter((name) => name.toLowerCase().includes(needle)) : names;
};

export { filterIcons };
