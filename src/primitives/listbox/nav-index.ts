/* @layer renderer-components @kind util */
import type { NavTarget } from './listbox-model.type';

const firstFrom = (enabled: readonly boolean[], start: number, step: number): number => {
  for (let at = start; at >= 0 && at < enabled.length; at += step) {
    if (enabled[at]) return at;
  }
  return -1;
};

const navIndex = (enabled: readonly boolean[], current: number, target: NavTarget): number => {
  if (target === 'first') return firstFrom(enabled, 0, 1);
  if (target === 'last') return firstFrom(enabled, enabled.length - 1, -1);
  if (current < 0) return target > 0 ? firstFrom(enabled, 0, 1) : firstFrom(enabled, enabled.length - 1, -1);
  const step = Math.sign(target);
  const aim = Math.min(Math.max(current + target, 0), enabled.length - 1);
  const landed = firstFrom(enabled, aim, step);
  return landed === -1 ? firstFrom(enabled, aim, -step) : landed;
};

export { navIndex };
