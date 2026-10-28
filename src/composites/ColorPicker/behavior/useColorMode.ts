/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { ColorMode } from '../ColorPicker.type';

const useColorMode = (modes: readonly ColorMode[], mode: ColorMode | undefined, onModeChange: ((mode: ColorMode) => void) | undefined) => {
  const [own, setOwn] = useState<ColorMode | undefined>(modes[0]);
  const fallback = own !== undefined && modes.includes(own) ? own : modes[0];
  const current = mode ?? fallback;

  const change = useCallback((next: ColorMode) => {
    setOwn(next);
    onModeChange?.(next);
  }, [onModeChange]);

  return { current, change };
};

export { useColorMode };
