/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { detailKeyDown } from '../behavior/detail-key-down';
import { placeProps } from '../behavior/place-props';
import { useDetailMeasure } from '../behavior/useDetailMeasure';
import type { DetailRowProps } from './DetailRow.type';
import './DetailRow.css';

const DetailRow = <T,>(props: DetailRowProps<T>) => {
  const { row, context, index } = props;
  const { columns, selection, reorder, renderDetail, onDetailClose, onDetailHeight } = context;
  const ref = useRef<HTMLElement>(null);
  useDetailMeasure(ref, index === undefined ? undefined : onDetailHeight);
  const span = columns.length + (selection?.selectable ? 1 : 0) + (reorder ? 1 : 0);

  return (
    <Box ref={ref} {...placeProps('data-table__detail', index, false)} role="row" onKeyDown={detailKeyDown(onDetailClose)}>
      <Box className="data-table__detail-cell" role="gridcell" aria-colspan={span}>
        {renderDetail?.(row)}
      </Box>
    </Box>
  );
};

export { DetailRow };
