/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../Box';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { barFrame } from './behavior/bar-frame';
import { barLabels } from './behavior/bar-labels';
import { barRows } from './behavior/bar-rows';
import { barTracks } from './behavior/bar-tracks';
import { formatAmount } from './behavior/format-amount';
import { groupSegments } from './behavior/group-segments';
import { StackedBarLegend } from './sub-components/StackedBarLegend';
import { StackedBarTrack } from './sub-components/StackedBarTrack';
import { DEFAULT_LIMIT } from './StackedBar.constants';
import type { StackedBarProps } from './StackedBar.type';
import './StackedBar.css';

const StackedBar = (props: StackedBarProps) => {
  const { segments, total, limit = DEFAULT_LIMIT, legend = false, label, orientation = 'horizontal', format = formatAmount } = props;
  const { charts } = useTesseraStrings();
  const parts = useMemo(() => groupSegments(segments, limit, charts.other), [segments, limit, charts.other]);
  const tracks = useMemo(() => barTracks(parts, total), [parts, total]);
  const rows = useMemo(() => barRows(parts, tracks.capacity, format, charts), [parts, tracks.capacity, format, charts]);
  const { freeTip, summary } = barLabels({ rows, tracks, label, format, strings: charts });
  const frame = barFrame({ orientation, size: props.size ?? 'md', height: props.height, className: props.className });

  return (
    <Box {...frame}>
      <StackedBarTrack rows={rows} sizes={tracks.sizes} orientation={orientation} freeTip={freeTip} summary={summary} />
      {legend && <StackedBarLegend rows={orientation === 'vertical' ? [...rows].reverse() : rows} />}
    </Box>
  );
};

export { StackedBar };
