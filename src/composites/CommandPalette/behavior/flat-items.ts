/* @layer renderer-components @kind logic */
import type { CommandPaletteGroup, CommandPaletteItem } from '../CommandPalette.type';

const flatItems = <T extends CommandPaletteItem>(groups: readonly CommandPaletteGroup<T>[]): T[] =>
  groups.flatMap((group) => group.items);

export { flatItems };
