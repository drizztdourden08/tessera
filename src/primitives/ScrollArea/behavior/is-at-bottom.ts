/* @layer renderer-components @kind logic */
import type { ScrollBox } from './is-at-bottom.type';

const isAtBottom = (box: ScrollBox, slack: number): boolean => box.scrollHeight - box.scrollTop - box.clientHeight <= slack;

export { isAtBottom };
