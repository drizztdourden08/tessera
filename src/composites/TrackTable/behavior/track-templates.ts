/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { DROP_LEVELS, TEMPLATE_PROPERTY } from '../TrackTable.constants';
import type { TrackColumn } from '../TrackTable.type';
import { trackSize } from './track-size';

const kept = <Row,>(column: TrackColumn<Row>, level: number): boolean => column.drop === undefined || column.drop > level;

const template = <Row,>(columns: readonly TrackColumn<Row>[], level: number): string =>
  columns.filter((column) => kept(column, level)).map(trackSize).join(' ');

const trackTemplates = <Row,>(columns: readonly TrackColumn<Row>[]): CSSProperties =>
  Object.fromEntries([0, ...DROP_LEVELS].map((level) => [`${TEMPLATE_PROPERTY}${level}`, template(columns, level)]));

export { trackTemplates };
