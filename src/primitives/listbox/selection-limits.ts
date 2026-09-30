/* @layer renderer-components @kind util */
import type { SelectionLimits } from './listbox-model.type';

const selectionLimits = (min: number | undefined, max: number | undefined): SelectionLimits => {
  const top = Math.max(1, max ?? 1);
  return { min: Math.min(Math.max(0, min ?? 1), top), max: top };
};

export { selectionLimits };
