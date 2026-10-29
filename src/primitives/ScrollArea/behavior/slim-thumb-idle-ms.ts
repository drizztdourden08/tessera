/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../dom/owner-window';
import { SLIM_THUMB_IDLE_TOKEN } from '../ScrollArea.constants';

const slimThumbIdleMs = (node: HTMLElement): number => {
  const value = ownerWindowOf(node).getComputedStyle(node).getPropertyValue(SLIM_THUMB_IDLE_TOKEN).trim();
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return value.endsWith('ms') ? amount : amount * 1000;
};

export { slimThumbIdleMs };
