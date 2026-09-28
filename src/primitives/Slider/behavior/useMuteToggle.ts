/* @layer renderer-components @kind hook */
import { useRef } from 'react';

const useMuteToggle = (
  value: number,
  onChange: (value: number) => void,
  onMuteToggle: (() => void) | undefined,
): (() => void) => {
  const prevVolumeRef = useRef(value || 100);

  if (value > 0) prevVolumeRef.current = value;

  return () => {
    if (onMuteToggle) {
      onMuteToggle();
    } else {
      onChange(value === 0 ? prevVolumeRef.current : 0);
    }
  };
};

export { useMuteToggle };
