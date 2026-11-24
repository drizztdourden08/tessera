/* @layer renderer-components @kind logic */
import type { RecordHeaderDensity } from '../RecordHeader.type';

const recordHeaderClass = (density: RecordHeaderDensity, className: string | undefined, toggles = false, menuOnHover = false): string =>
  ['record-header', `record-header--${density}`, toggles && 'record-header--toggle', menuOnHover && 'record-header--menu-hover', className].filter(Boolean).join(' ');

export { recordHeaderClass };
