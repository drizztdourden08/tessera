/* @layer stories @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import { composite, hexOf } from '../tokens/colour-math';
import { useThemeVersion } from '../tokens/use-theme-version';

const useSwatchHex = <E extends HTMLElement>() => {
  const ref = useRef<E | null>(null);
  const version = useThemeVersion(ref);
  const [hex, setHex] = useState('');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pixel = composite([getComputedStyle(el).backgroundColor]);
    setHex(pixel ? hexOf(pixel) : '');
  }, [version]);

  return { ref, hex };
};

export { useSwatchHex };
