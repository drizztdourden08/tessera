/* @layer renderer-components @kind types */
import type { Dispatch, SetStateAction } from 'react';
import type { VirtualGridSection } from '../VirtualGrid.type';

interface GridDropInput {
  section: Pick<VirtualGridSection<unknown>, 'key' | 'label' | 'onDropData' | 'accepts'>;
  setHot: Dispatch<SetStateAction<string | null>>;
  announce: (message: string) => void;
  said: (count: number, section: string) => string;
}

export type { GridDropInput };
