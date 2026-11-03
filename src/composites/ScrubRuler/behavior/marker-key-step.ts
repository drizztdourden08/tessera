/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { RulerMarker } from '../ScrubRuler.type';

const DIRECTION: Readonly<Record<string, number>> = { ArrowLeft: -1, ArrowRight: 1 };

const markerKeyStep = (key: string, marker: RulerMarker): number | null => {
  const direction = DIRECTION[key];
  if (direction === undefined) return null;
  const next = clampNumber(marker.index + direction, marker.min, marker.max);
  return next === marker.index ? null : next;
};

export { markerKeyStep };
