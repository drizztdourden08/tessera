/* @layer renderer-components @kind util */
import { clampValue } from '../../../primitives/Slider/behavior/clamp-value';
import { VOLUME_NUDGE_SHARE } from '../VolumeControl.constants';
import type { VolumeRange } from '../VolumeControl.type';

const nudgeVolume = (level: number, direction: 1 | -1, range: VolumeRange): number => {
  const { min, max, step } = range;
  const amount = Math.max(step, Math.round(((max - min) * VOLUME_NUDGE_SHARE) / step) * step);
  return clampValue(level + direction * amount, range);
};

export { nudgeVolume };
