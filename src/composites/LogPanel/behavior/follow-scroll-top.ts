/* @layer renderer-components @kind logic */
import type { LogOrder } from '../LogPanel.type';
import type { ScrollBox } from './is-at-bottom.type';

const followScrollTop = (box: ScrollBox, order: LogOrder): number => (order === 'newest-first' ? 0 : box.scrollHeight);

export { followScrollTop };
