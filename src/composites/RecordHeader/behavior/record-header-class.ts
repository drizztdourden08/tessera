/* @layer renderer-components @kind logic */
import type { RecordHeaderDensity } from '../RecordHeader.type';

const recordHeaderClass = (density: RecordHeaderDensity, className: string | undefined): string =>
  ['record-header', `record-header--${density}`, className].filter(Boolean).join(' ');

export { recordHeaderClass };
