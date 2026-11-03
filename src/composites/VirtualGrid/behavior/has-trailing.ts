/* @layer renderer-components @kind logic */
import type { VirtualGridTrailing } from '../VirtualGrid.type';

const hasTrailing = (trailing: VirtualGridTrailing | undefined): boolean => trailing !== undefined && trailing !== null && trailing !== false;

export { hasTrailing };
