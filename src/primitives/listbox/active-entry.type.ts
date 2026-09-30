/* @layer renderer-components @kind types */
import type { NavTarget } from './listbox-model.type';

interface ActiveEntry {
  index: number;
  enabled: readonly boolean[];
  move: (target: NavTarget) => void;
  activate: (index: number) => void;
}

export type { ActiveEntry };
