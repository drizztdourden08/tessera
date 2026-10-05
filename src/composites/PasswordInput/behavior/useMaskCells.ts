/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState, type RefObject } from 'react';
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { MaskCells } from './mask.type';
import { measureMaskCells } from './measure-mask-cells';

const useMaskCells = (inputRef: RefObject<HTMLInputElement | null>, maskChar: string | undefined, size: ControlSize): MaskCells => {
  const [cells, setCells] = useState<MaskCells>(1);
  useLayoutEffect(() => {
    const input = inputRef.current;
    setCells(input === null || maskChar === undefined ? 1 : measureMaskCells(input, maskChar));
  }, [maskChar, size]);
  return cells;
};

export { useMaskCells };
