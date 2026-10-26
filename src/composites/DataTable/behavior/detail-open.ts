/* @layer renderer-components @kind logic */
import type { RowRenderContext } from '../DataTable.type';

const detailOpen = <T>(row: T, context: RowRenderContext<T>): boolean =>
  context.renderDetail !== undefined && context.detailRowId != null && context.detailRowId === context.getRowId(row);

export { detailOpen };
