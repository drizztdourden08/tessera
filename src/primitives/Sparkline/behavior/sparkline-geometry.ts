/* @layer renderer-components @kind logic */
import { EMPTY_GEOMETRY, VIEW_SIZE } from '../Sparkline.constants';
import type { SparklineDomain, SparklineGeometry } from '../Sparkline.type';
import { roundCoordinate } from './round-coordinate';
import { valueToY } from './value-to-y';

const sparklineGeometry = (values: readonly number[], domain: SparklineDomain, length?: number): SparklineGeometry => {
  const slots = Math.max(1, Math.floor(length ?? values.length));
  const shown = values.slice(-slots);
  const step = slots > 1 ? VIEW_SIZE / (slots - 1) : 0;
  const offset = slots - shown.length;
  const points = shown.flatMap((value, index) => (Number.isFinite(value)
    ? [{ x: slots > 1 ? roundCoordinate((offset + index) * step) : VIEW_SIZE, y: valueToY(value, domain) }]
    : []));
  if (points.length === 0) return EMPTY_GEOMETRY;
  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  const first = points[0] ?? { x: 0, y: 0 };
  const end = points[points.length - 1] ?? first;
  const area = `${line} L${end.x} ${VIEW_SIZE} L${first.x} ${VIEW_SIZE} Z`;
  return { line, area, end };
};

export { sparklineGeometry };
