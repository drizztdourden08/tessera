/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ListItemColumnAlign } from '../ListItemRow.type';

type HeaderTrack = 'icon' | 'main' | 'column' | 'action';

interface HeaderCell {
  track: HeaderTrack;
  label: ReactNode;
  align: ListItemColumnAlign;
}

export type { HeaderCell };
