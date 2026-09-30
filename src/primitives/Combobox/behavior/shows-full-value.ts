/* @layer renderer-components @kind util */
import type { ListboxDisplay, ListboxSetup } from '../../listbox/listbox-model.type';

const showsFullValue = <T, V>(setup: ListboxSetup<T, V>, displays: readonly ListboxDisplay<T>[], editing: boolean): boolean => {
  if (editing || setup.max > 1 || displays[0]?.item === undefined) return false;
  return setup.valueComponent !== undefined || setup.valueDisplay === 'full';
};

export { showsFullValue };
