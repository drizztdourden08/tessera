/* @layer renderer-components @kind data */
import { PAGE_STEP } from './listbox.constants';
import type { NavTarget } from './listbox-model.type';

const NAV_KEYS: Readonly<Record<string, NavTarget>> = {
  ArrowDown: 1,
  ArrowUp: -1,
  PageDown: PAGE_STEP,
  PageUp: -PAGE_STEP,
  Home: 'first',
  End: 'last',
};

export { NAV_KEYS };
