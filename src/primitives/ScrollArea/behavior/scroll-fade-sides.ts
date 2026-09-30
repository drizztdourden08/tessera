/* @layer renderer-components @kind logic */
import { FADE_SLACK_PX } from '../ScrollArea.constants';
import type { ScrollAxis } from '../ScrollArea.type';

const scrollFadeSides = (node: HTMLElement, axis: ScrollAxis): string => {
  const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = node;
  const sides: string[] = [];
  if (axis !== 'x') {
    if (scrollTop > FADE_SLACK_PX) sides.push('top');
    if (scrollTop + clientHeight < scrollHeight - FADE_SLACK_PX) sides.push('bottom');
  }
  if (axis !== 'y') {
    if (Math.abs(scrollLeft) > FADE_SLACK_PX) sides.push('left');
    if (Math.abs(scrollLeft) + clientWidth < scrollWidth - FADE_SLACK_PX) sides.push('right');
  }
  return sides.join(' ');
};

export { scrollFadeSides };
