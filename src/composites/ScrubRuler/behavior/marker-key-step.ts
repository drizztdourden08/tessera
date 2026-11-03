/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { SCRUB_MARKER_DIRECTION } from '../ScrubRuler.constants';
import type { RulerMarker } from '../ScrubRuler.type';

const markerKeyStep = (key: string, marker: RulerMarker): number | null => {
  const direction = SCRUB_MARKER_DIRECTION[key];
  if (direction === undefined) return null;
  const next = clampNumber(marker.index + direction, marker.min, marker.max);
  return next === marker.index ? null : next;
};

export { markerKeyStep };
