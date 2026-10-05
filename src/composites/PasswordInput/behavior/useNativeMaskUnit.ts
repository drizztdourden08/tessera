/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState, type RefObject } from 'react';
import type { MaskUnit } from './mask.type';
import { nativeMaskUnit } from './native-mask-unit';

const useNativeMaskUnit = (inputRef: RefObject<HTMLInputElement | null>): MaskUnit => {
  const [unit, setUnit] = useState<MaskUnit>('grapheme');
  useLayoutEffect(() => {
    const doc = inputRef.current?.ownerDocument;
    if (doc !== undefined) setUnit(nativeMaskUnit(doc));
  }, []);
  return unit;
};

export { useNativeMaskUnit };
