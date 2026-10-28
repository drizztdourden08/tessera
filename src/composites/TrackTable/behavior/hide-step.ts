/* @layer renderer-components @kind logic */
import { DROP_STEPS } from '../TrackTable.constants';
import type { TrackColumn, TrackHideBelow } from '../TrackTable.type';

const hideStep = <Row,>(column: TrackColumn<Row>): TrackHideBelow | undefined =>
  column.hideBelow ?? (column.drop === undefined ? undefined : DROP_STEPS[column.drop]);

export { hideStep };
