/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { trackTemplates } from './behavior/track-templates';
import { TrackHead } from './sub-components/TrackHead';
import { TrackRow } from './sub-components/TrackRow';
import type { TrackTableProps } from './TrackTable.type';
import './TrackTable.css';

const TrackTable = <Row,>(props: TrackTableProps<Row>) => {
  const { label, rows, columns, rowKey, head = true, empty, className } = props;
  const classes = ['track-table', className].filter(Boolean).join(' ');
  return (
    <Box className={classes} role="table" aria-label={label} aria-rowcount={rows.length + (head ? 1 : 0)} style={trackTemplates(columns)}>
      {head && <TrackHead columns={columns} />}
      {rows.map((row, index) => <TrackRow key={rowKey(row)} row={row} index={index} columns={columns} />)}
      {rows.length === 0 && empty !== undefined && <Box className="track-table__empty">{empty}</Box>}
    </Box>
  );
};

export { TrackTable };
