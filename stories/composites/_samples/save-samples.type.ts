/* @layer stories @kind types */
import type { ReactNode } from 'react';

interface SampleSave {
  id: string;
  name: string;
  when: string;
  minutesAgo: number;
}

interface ItemListUndoDemoProps {
  meta?: (save: SampleSave) => ReactNode;
}

export type { ItemListUndoDemoProps, SampleSave };
