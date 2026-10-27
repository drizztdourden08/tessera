/* @layer renderer-components @kind logic */
import { visibleRange } from './visible-range';
import type { RowRange } from '../../virtual';
import type { DetailRangeInput, DetailSpan } from './detail-span.type';

const withoutDetail = (offset: number, rowHeight: number, detail: DetailSpan): number => {
  const start = (detail.at + 1) * rowHeight;
  return offset <= start ? offset : Math.max(start, offset - detail.height);
};

const detailRange = (input: DetailRangeInput): RowRange => {
  const { metrics, overscan, count, detail } = input;
  const { top, viewport, rowHeight } = metrics;
  if (detail.at < 0 || detail.height <= 0) return visibleRange({ scrollTop: top, viewport, rowHeight, count, overscan });
  const from = withoutDetail(Math.max(0, top), rowHeight, detail);
  const to = withoutDetail(Math.max(0, top) + Math.max(0, viewport), rowHeight, detail);
  return visibleRange({ scrollTop: from, viewport: to - from, rowHeight, count, overscan });
};

export { detailRange };
