/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { HIDE_STEPS, TEMPLATE_PROPERTY } from '../TrackTable.constants';
import type { TrackColumn } from '../TrackTable.type';
import { hideStep } from './hide-step';
import { trackSize } from './track-size';

const kept = <Row,>(column: TrackColumn<Row>, step: number): boolean => (hideStep(column) ?? 0) < step;

const template = <Row,>(columns: readonly TrackColumn<Row>[], step: number): string =>
  columns.filter((column) => kept(column, step)).map(trackSize).join(' ');

const trackTemplates = <Row,>(columns: readonly TrackColumn<Row>[]): CSSProperties =>
  Object.fromEntries([0, ...HIDE_STEPS].map((step) => [`${TEMPLATE_PROPERTY}${step}`, step === 0 ? columns.map(trackSize).join(' ') : template(columns, step)]));

export { trackTemplates };
