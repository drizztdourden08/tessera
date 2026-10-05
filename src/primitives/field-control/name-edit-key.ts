/* @layer renderer-components @kind util */
import type { NameEditAction } from './name-edit.type';

const nameEditKey = (key: string, composing: boolean): NameEditAction | null => {
  if (composing) return null;
  if (key === 'Enter') return 'keep';
  if (key === 'Escape') return 'undo';
  return null;
};

export { nameEditKey };
