/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Box } from '../../../primitives/Box';
import { detailOpen } from '../behavior/detail-open';
import { DataRow } from './DataRow';
import { DetailRow } from './DetailRow';
import { GroupNodeRow } from './GroupNodeRow';
import { COUNT_PROPERTY, DETAIL_AT_PROPERTY, DETAIL_HEIGHT_PROPERTY } from './VirtualRows.constants';
import type { CSSProperties } from 'react';
import type { VirtualRowsProps } from './VirtualRows.type';

const VirtualRows = <T,>(props: VirtualRowsProps<T>) => {
  const { virtual, context } = props;
  const { items, indices, bodyRef, onFocus, onBlur, detail } = virtual;
  const sized = {
    [COUNT_PROPERTY]: items.length,
    [DETAIL_AT_PROPERTY]: detail.at,
    [DETAIL_HEIGHT_PROPERTY]: `${detail.height}px`,
  } as CSSProperties;

  return (
    <Box ref={bodyRef} className="data-table__body" role="rowgroup" style={sized} onFocus={onFocus} onBlur={onBlur}>
      {indices.map((at) => {
        const item = items[at];
        if (item === undefined) return null;
        if (item.kind === 'row') {
          return (
            <Fragment key={item.key}>
              <DataRow row={item.row} context={context} index={at} />
              {detailOpen(item.row, context) && <DetailRow row={item.row} context={context} index={at} />}
            </Fragment>
          );
        }
        return <GroupNodeRow key={item.key} node={item.node} uid={item.uid} context={context} index={at} />;
      })}
    </Box>
  );
};

export { VirtualRows };
