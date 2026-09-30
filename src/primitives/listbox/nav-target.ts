/* @layer renderer-components @kind util */
import { NAV_KEYS } from './nav-target.constants';
import type { NavTarget } from './listbox-model.type';

const navTarget = (key: string, withEnds: boolean): NavTarget | undefined => {
  const target = NAV_KEYS[key];
  if (!withEnds && (target === 'first' || target === 'last')) return undefined;
  return target;
};

export { navTarget };
