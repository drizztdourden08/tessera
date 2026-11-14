/* @layer renderer-components @kind logic */
import type { LogOrder } from '../LogPanel.type';
import { isAtBottom } from '../../../primitives/ScrollArea/behavior/is-at-bottom';
import type { ScrollBox } from '../../../primitives/ScrollArea/behavior/is-at-bottom.type';

const isAtFollowEdge = (box: ScrollBox, slack: number, order: LogOrder): boolean =>
  order === 'newest-first' ? box.scrollTop <= slack : isAtBottom(box, slack);

export { isAtFollowEdge };
