/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

type MaskUnit = 'grapheme' | 'code-unit';

type MaskCells = 1 | 2 | 3;

interface MaskOverlayProps {
  inputRef: RefObject<HTMLInputElement | null>;
  maskChar: string;
  value: string;
}

export type { MaskCells, MaskOverlayProps, MaskUnit };
