/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import { detailIndex } from './detail-index';
import type { DetailSpan, DetailSpanState, UseDetailSpanInput } from './detail-span.type';

const useDetailSpan = <T,>(input: UseDetailSpanInput<T>): DetailSpanState => {
  const { items, detailRowId, getRowId } = input;
  const [height, setHeight] = useState(0);
  const at = useMemo(() => detailIndex(items, detailRowId, getRowId), [items, detailRowId, getRowId]);
  const detail = useMemo<DetailSpan>(() => ({ at, height: at < 0 ? 0 : height }), [at, height]);
  return { detail, onDetailHeight: setHeight };
};

export { useDetailSpan };
