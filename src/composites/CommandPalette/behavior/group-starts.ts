/* @layer renderer-components @kind logic */
import type { CommandPaletteGroup, CommandPaletteItem } from '../CommandPalette.type';

const groupStarts = <T extends CommandPaletteItem>(groups: readonly CommandPaletteGroup<T>[]): number[] => {
  let next = 0;
  return groups.map((group) => {
    const start = next;
    next += group.items.length;
    return start;
  });
};

export { groupStarts };
