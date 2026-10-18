/* @layer stories @kind types */
import type { ShotSave } from './save-samples.type';

interface ItemListSaveRowDemoProps {
  saves?: readonly ShotSave[];
  selectedId?: string;
  maxRows?: number;
}

export type { ItemListSaveRowDemoProps };
