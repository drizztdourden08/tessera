/* @layer renderer-components @kind util */
import type { UnsavedAsk } from './unsaved-guard.type';

const unsavedAsk = (dirty: boolean, busy: boolean): UnsavedAsk => {
  if (busy) return 'wait';
  return dirty ? 'ask' : 'go';
};

export { unsavedAsk };
