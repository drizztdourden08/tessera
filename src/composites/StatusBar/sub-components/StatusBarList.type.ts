/* @layer renderer-components @kind types */
import type { StatusBarAlign, StatusBarEntry, StatusBarMenuHook } from '../StatusBar.type';

interface StatusBarListProps {
  items: readonly StatusBarEntry[];
  onContextMenu?: StatusBarMenuHook;
  side: StatusBarAlign;
}

export type { StatusBarListProps };
