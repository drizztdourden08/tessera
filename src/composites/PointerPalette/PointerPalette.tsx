/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { PointerPaletteProps } from './PointerPalette.type';
import { useFocusReturn } from './behavior/useFocusReturn';
import { PaletteSurface } from './sub-components/PaletteSurface';
import './PointerPalette.css';

const PointerPalette = (props: PointerPaletteProps) => {
  const { open, 'aria-label': label, ...surface } = props;
  const origin = useRef<HTMLElement | null>(null);
  useFocusReturn(open, origin);

  return open ? <PaletteSurface {...surface} label={label} origin={origin} /> : null;
};

export { PointerPalette };
