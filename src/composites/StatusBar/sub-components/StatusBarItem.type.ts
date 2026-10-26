/* @layer renderer-components @kind types */
import type { StatusBarEntry, StatusBarMenuHook } from '../StatusBar.type';

interface StatusBarItemProps {
  item: StatusBarEntry;
  onContextMenu?: StatusBarMenuHook;
}

export type { StatusBarItemProps };
