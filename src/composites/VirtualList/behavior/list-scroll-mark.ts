/* @layer renderer-components @kind logic */
import type { VirtualScrollParent } from '../../virtual';

const listScrollMark = (scrollParent?: VirtualScrollParent): true | undefined => (scrollParent === undefined ? undefined : true);

export { listScrollMark };
