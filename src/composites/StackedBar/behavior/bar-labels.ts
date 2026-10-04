/* @layer renderer-components @kind logic */
import type { BarLabels, BarLabelsInput } from './bar-labels.type';
import { sharePercent } from './share-percent';

const barLabels = ({ rows, tracks, label, format, strings }: BarLabelsInput): BarLabels => ({
  freeTip: tracks.free > 0 ? strings.segmentTip(strings.free, format(tracks.free), sharePercent(tracks.free, tracks.capacity)) : null,
  summary: label ? strings.barSummary(label, rows.map((row) => `${row.label} ${row.amount}`)) : undefined,
});

export { barLabels };
