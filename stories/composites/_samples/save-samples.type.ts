/* @layer stories @kind types */
import type { ReactNode } from 'react';

interface SampleSave {
  id: string;
  name: string;
  when: string;
  minutesAgo: number;
}

interface ShotSave {
  id: string;
  name: string;
  when: number;
  shot: string;
}

interface ItemListUndoDemoProps {
  meta?: (save: SampleSave) => ReactNode;
}

export type { ItemListUndoDemoProps, SampleSave, ShotSave };
