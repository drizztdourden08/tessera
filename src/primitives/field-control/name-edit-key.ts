/* @layer renderer-components @kind util */
import type { NameEditAction } from './name-edit.type';

const nameEditKey = (key: string, composing: boolean, multiline = false, held = false): NameEditAction | null => {
  if (composing) return null;
  if (key === 'Enter') return multiline && !held ? null : 'keep';
  if (key === 'Escape') return 'undo';
  return null;
};

export { nameEditKey };
