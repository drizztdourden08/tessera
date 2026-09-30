/* @layer renderer-components @kind logic */
import type { CommandPaletteItem } from '../CommandPalette.type';

const runItem = <T extends CommandPaletteItem>(item: T, withModifier: boolean, onSelect: (item: T) => void): void => {
  if (withModifier && item.toggle) item.toggle.onChange(!item.toggle.checked);
  else onSelect(item);
};

export { runItem };
