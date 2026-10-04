/* @layer renderer-components @kind util */
import type { InputIconFamily, InputIconName } from '../InputIcon.type';
import { INPUT_ICON_NAMES } from './input-icon-names.constants';

const isInputIconName = <F extends InputIconFamily>(family: F, name: string): name is InputIconName<F> => {
  if (!Object.hasOwn(INPUT_ICON_NAMES, family)) return false;
  const names: readonly string[] = INPUT_ICON_NAMES[family];
  return names.includes(name);
};

export { isInputIconName };
