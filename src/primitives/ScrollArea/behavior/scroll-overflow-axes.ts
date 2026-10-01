/* @layer renderer-components @kind logic */
import { FADE_SLACK_PX } from '../ScrollArea.constants';
import type { ScrollAxis } from '../ScrollArea.type';

const scrollOverflowAxes = (node: HTMLElement, axis: ScrollAxis): string => {
  const axes: string[] = [];
  if (axis !== 'y' && node.scrollWidth - node.clientWidth > FADE_SLACK_PX) axes.push('x');
  if (axis !== 'x' && node.scrollHeight - node.clientHeight > FADE_SLACK_PX) axes.push('y');
  return axes.join(' ');
};

export { scrollOverflowAxes };
