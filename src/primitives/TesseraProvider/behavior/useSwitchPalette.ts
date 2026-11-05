/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { useTesseraOverride } from './useTesseraOverride';
import { transitionPalette } from './transition-palette';

const useSwitchPalette = (): ((apply: () => void, scope?: Element) => void) => {
  const animate = useTesseraOverride('paletteTransition') !== false;
  return useCallback((apply: () => void, scope?: Element) => transitionPalette(apply, animate, scope), [animate]);
};

export { useSwitchPalette };
