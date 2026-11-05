/* @layer renderer-components @kind util */
import { INTERACTIVE_TARGET } from './interactive-target.constants';

const isInteractiveTarget = (target: EventTarget | null, boundary?: Element): boolean => {
  if (!(target instanceof Element)) return false;
  const found = target.closest(INTERACTIVE_TARGET);
  if (found === null) return false;
  return boundary === undefined || (found !== boundary && boundary.contains(found));
};

export { isInteractiveTarget };
