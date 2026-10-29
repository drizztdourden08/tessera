/* @layer renderer-components @kind logic */
import { DEFAULT_FR, TOKEN_NAME } from '../TrackTable.constants';
import type { TrackColumn } from '../TrackTable.type';

const fixedLength = (width: string): string => (TOKEN_NAME.test(width) ? `var(--${width})` : width);

const trackSize = <Row,>(column: TrackColumn<Row>): string =>
  (column.width === undefined ? `minmax(0, ${column.fr ?? DEFAULT_FR}fr)` : fixedLength(column.width));

export { trackSize };
