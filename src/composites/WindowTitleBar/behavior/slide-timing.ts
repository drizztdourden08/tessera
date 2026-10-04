/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { SLIDE_ANIMATION_ID, SLIDE_DURATION_TOKEN, SLIDE_EASE_TOKEN } from '../WindowTitleBar.constants';

const toMs = (value: string): number => {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return value.trim().endsWith('ms') ? amount : amount * 1000;
};

const slideTiming = (bar: HTMLElement): KeyframeAnimationOptions => {
  const style = ownerWindowOf(bar).getComputedStyle(bar);
  const easing = style.getPropertyValue(SLIDE_EASE_TOKEN).trim();
  return { id: SLIDE_ANIMATION_ID, duration: toMs(style.getPropertyValue(SLIDE_DURATION_TOKEN)), easing: easing || 'ease' };
};

export { slideTiming };
