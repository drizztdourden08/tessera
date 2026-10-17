/* @layer renderer-components @kind util */
import type { MuteSource } from '../VolumeControl.type';

const applyVolumeLevel = (source: MuteSource, next: number): void => {
  const { onChange, muted, onMutedChange, min = 0 } = source;
  if (muted === true && next > min) onMutedChange?.(false);
  onChange(next);
};

export { applyVolumeLevel };
