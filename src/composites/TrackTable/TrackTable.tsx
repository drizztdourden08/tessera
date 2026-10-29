/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Box } from '../../primitives/Box';
import { trackTemplates } from './behavior/track-templates';
import { TrackDetail } from './sub-components/TrackDetail';
import { TrackHead } from './sub-components/TrackHead';
import { TrackRow } from './sub-components/TrackRow';
import type { TrackTableProps } from './TrackTable.type';
import './TrackTable.css';

const TrackTable = <Row,>(props: TrackTableProps<Row>) => {
  const { label, rows, columns, rowKey, head = true, empty, onRowClick, rowDetail, rowTone, className } = props;
  const classes = ['track-table', className].filter(Boolean).join(' ');
  const details = rows.map((row) => rowDetail?.(row));
  const drawn = details.map((detail) => detail != null && detail !== false);
  const detailCount = drawn.filter(Boolean).length;
  return (
    <Box className={classes} role="table" aria-label={label} aria-rowcount={rows.length + detailCount + (head ? 1 : 0)} style={trackTemplates(columns)}>
      {head && <TrackHead columns={columns} />}
      {rows.map((row, index) => (
        <Fragment key={rowKey(row)}>
          <TrackRow row={row} index={index} columns={columns} onRowClick={onRowClick} tone={rowTone?.(row)} open={drawn[index]} />
          {drawn[index] && <TrackDetail>{details[index]}</TrackDetail>}
        </Fragment>
      ))}
      {rows.length === 0 && empty !== undefined && <Box className="track-table__empty">{empty}</Box>}
    </Box>
  );
};

export { TrackTable };
