/* @layer renderer-components @kind logic */
import { bodyShift } from './body-shift';
import { scrollTopForSpan } from './scroll-top-for-span';
import type { ScrollToSpanInput } from './scroll-to-span.type';

const scrollToSpan = (input: ScrollToSpanInput): void => {
  const { scroller, body, shifted, across, span, align } = input;
  const shift = shifted ? bodyShift(scroller, body, across) : 0;
  const place = {
    top: span.top + shift,
    height: span.height,
    viewport: across ? scroller.clientWidth : scroller.clientHeight,
    scrollTop: across ? scroller.scrollLeft : scroller.scrollTop,
  };
  const to = scrollTopForSpan(place, align);
  if (across) scroller.scrollLeft = to;
  else scroller.scrollTop = to;
};

export { scrollToSpan };
