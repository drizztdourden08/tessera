/* @layer renderer-components @kind helper */
import { MS_PER_SECOND } from './leave-time.constants';

const toMs = (value: string): number => {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return value.endsWith('ms') ? amount : amount * MS_PER_SECOND;
};

const longest = (list: string): number => Math.max(0, ...list.split(',').map((part) => toMs(part.trim())));

const leaveTime = (element: Element): number => {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  if (!style) return 0;
  return longest(style.animationDuration) + longest(style.animationDelay);
};

export { leaveTime };
