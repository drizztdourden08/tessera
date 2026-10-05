/* @layer renderer-components @kind util */
import type { UnsavedSave } from './unsaved-guard.type';

const settleSave = (onSave: UnsavedSave): Promise<boolean> =>
  Promise.resolve().then(onSave).then((result) => result !== false, () => false);

export { settleSave };
