/* @layer renderer-components @kind logic */
import type { RecordCardDensity } from '../RecordCard.type';

const recordCardClass = (density: RecordCardDensity, className: string | undefined): string =>
  ['record-card', `record-card--${density}`, className].filter(Boolean).join(' ');

export { recordCardClass };
