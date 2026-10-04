/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { REDUCED_MOTION_QUERY } from '../../../primitives/dom/reduced-motion.constants';
import { ITEM_ATTRIBUTE, ITEM_SELECTOR, SLIDE_ANIMATION_ID } from '../WindowTitleBar.constants';
import type { BarSnapshot } from './bar-slide.type';
import { itemPlace } from './item-place';
import { slideKeyframes } from './slide-keyframes';
import { slideTiming } from './slide-timing';

const playBarSlide = (bar: HTMLElement, before: BarSnapshot): void => {
  const items = Array.from(bar.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
  items.forEach((item) => item.getAnimations().forEach((running) => {
    if (running.id === SLIDE_ANIMATION_ID) running.cancel();
  }));
  if (ownerWindowOf(bar).matchMedia(REDUCED_MOTION_QUERY).matches) return;
  const timing = slideTiming(bar);
  items.forEach((item) => {
    const was = before.get(item.getAttribute(ITEM_ATTRIBUTE) ?? '');
    const frames = was ? slideKeyframes(was, itemPlace(item)) : null;
    if (frames) item.animate(frames, timing);
  });
};

export { playBarSlide };
