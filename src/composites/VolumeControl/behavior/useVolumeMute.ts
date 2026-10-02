/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { MuteSource, VolumeMute } from '../VolumeControl.type';

const useVolumeMute = (source: MuteSource): VolumeMute => {
  const { value, onChange, muted: flag, onMutedChange, min = 0, max = 100 } = source;
  const lastLevel = useRef(value > min ? value : max);
  if (value > min) lastLevel.current = value;
  const flagged = flag !== undefined;
  const muted = flagged ? flag : value <= min;

  const setLevel = (next: number) => {
    if (flagged && flag && next > min) onMutedChange?.(false);
    onChange(next);
  };
  const toggle = () => {
    if (flagged) onMutedChange?.(!flag);
    else onChange(muted ? lastLevel.current : min);
  };

  return { muted, level: flagged && flag ? min : value, setLevel, toggle };
};

export { useVolumeMute };
