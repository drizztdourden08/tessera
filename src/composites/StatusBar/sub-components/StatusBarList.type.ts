/* @layer renderer-components @kind types */
import type { StatusBarAlign, StatusBarEntry } from '../StatusBar.type';

interface StatusBarListProps {
  items: readonly StatusBarEntry[];
  side: StatusBarAlign;
}

export type { StatusBarListProps };
