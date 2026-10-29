/* @layer renderer-components @kind logic */
import { startsInside } from './starts-inside';
import { startsOnBackground } from './starts-on-background';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { MarqueeOptions } from './marquee.type';

const mayStart = (options: MarqueeOptions, container: HTMLElement, event: ReactPointerEvent<HTMLElement>): boolean => {
  if (options.enabled === false || event.button !== 0) return false;
  if (!startsInside(container, event.target)) return false;
  return (options.canStart ?? startsOnBackground(options.itemSelector))(event);
};

export { mayStart };
