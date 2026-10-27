/* @layer renderer-components @kind logic */
import { guardCellControl } from '../../../primitives/dom/guard-cell-control';
import type { TrackRowAttrs, TrackRowProps } from '../TrackTable.type';

const rowAttrs = <Row,>({ row, onRowClick, tone, open }: Pick<TrackRowProps<Row>, 'row' | 'onRowClick' | 'tone' | 'open'>): TrackRowAttrs => {
  const attrs: TrackRowAttrs = { 'data-tone': tone, 'data-open': open ? 'yes' : undefined };
  if (!onRowClick) return attrs;
  attrs.tabIndex = 0;
  attrs['data-interactive'] = 'yes';
  attrs.onClick = guardCellControl(() => onRowClick(row));
  attrs.onKeyDown = (event) => {
    if (event.target !== event.currentTarget || event.key !== 'Enter') return;
    event.preventDefault();
    onRowClick(row);
  };
  return attrs;
};

export { rowAttrs };
