/* @layer renderer-components @kind util */
import { VOLUME_STEPS } from '../VolumeIcon.constants';
import type { VolumeStep } from '../VolumeIcon.type';

const volumeStep = (level: number, muted = false): VolumeStep => {
  if (muted || !(level > 0)) return 0;
  return Math.min(VOLUME_STEPS, Math.ceil(Math.min(level, 1) * VOLUME_STEPS)) as VolumeStep;
};

export { volumeStep };
