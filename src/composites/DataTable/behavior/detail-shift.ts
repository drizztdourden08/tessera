/* @layer renderer-components @kind logic */
import type { DetailSpan } from './detail-span.type';

const detailShift = (index: number, detail: DetailSpan | undefined): number =>
  detail !== undefined && detail.at >= 0 && index > detail.at ? detail.height : 0;

export { detailShift };
