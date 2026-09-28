/* @layer stories @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import { composite, contrastRatio, hexOf } from './colour-math';
import { useThemeVersion } from './use-theme-version';

type Measured = { ratio: number; text: string; fill: string } | null;

const useContrast = () => {
  const ref = useRef<HTMLElement | null>(null);
  const version = useThemeVersion(ref);
  const [measured, setMeasured] = useState<Measured>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const style = getComputedStyle(el);
    const ground = style.getPropertyValue('--c-bg').trim() || 'white';
    const fill = composite([ground, style.backgroundColor]);
    const text = composite([ground, style.backgroundColor, style.color]);
    setMeasured(fill && text ? { ratio: contrastRatio(text, fill), text: hexOf(text), fill: hexOf(fill) } : null);
  }, [version]);

  return { ref, measured };
};

export { useContrast };
