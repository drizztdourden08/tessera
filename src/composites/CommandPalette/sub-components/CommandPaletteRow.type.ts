/* @layer renderer-components @kind types */
import type { CommandPaletteItem } from '../CommandPalette.type';

interface CommandPaletteRowProps {
  item: CommandPaletteItem;
  index?: number;
  id?: string;
  active?: boolean;
  onSelect?: (item: CommandPaletteItem) => void;
  onHover?: () => void;
  className?: string;
}

export type { CommandPaletteRowProps };
