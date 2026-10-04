/* @layer renderer-components @kind logic */
import { AUTO_COLORS, OTHER_COLOR, OTHER_ID } from '../StackedBar.constants';
import type { StackedBarPart, StackedBarSegment } from '../StackedBar.type';

const colourOf = (segment: StackedBarSegment, index: number): StackedBarPart => ({
  id: segment.id,
  label: segment.label,
  value: segment.value,
  color: segment.color ?? AUTO_COLORS[index % AUTO_COLORS.length] ?? OTHER_COLOR,
  grouped: 0,
});

const groupSegments = (segments: readonly StackedBarSegment[], limit: number, otherLabel: string): StackedBarPart[] => {
  const parts = segments.map(colourOf).filter((part) => Number.isFinite(part.value) && part.value > 0);
  const room = Math.max(1, Math.floor(limit));
  if (parts.length <= room) return parts;
  const largest = [...parts].sort((a, b) => b.value - a.value).slice(0, room - 1);
  const kept = new Set(largest.map((part) => part.id));
  const rest = parts.filter((part) => !kept.has(part.id));
  const other: StackedBarPart = {
    id: OTHER_ID,
    label: otherLabel,
    value: rest.reduce((sum, part) => sum + part.value, 0),
    color: OTHER_COLOR,
    grouped: rest.length,
  };
  return [...parts.filter((part) => kept.has(part.id)), other];
};

export { groupSegments };
