/* @layer renderer-components @kind util */
import type { ReorderDragState } from './reorder.type';

const finalIndex = (drag: ReorderDragState): number => (drag.before > drag.from ? drag.before - 1 : drag.before);

export { finalIndex };
