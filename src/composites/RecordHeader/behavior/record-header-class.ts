/* @layer renderer-components @kind logic */
import type { RecordHeaderDensity } from '../RecordHeader.type';

const recordHeaderClass = (density: RecordHeaderDensity, className: string | undefined, toggles = false): string =>
  ['record-header', `record-header--${density}`, toggles && 'record-header--toggle', className].filter(Boolean).join(' ');

export { recordHeaderClass };
