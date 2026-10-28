/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

type SwatchFocusRing = 'inset' | 'apart';

interface ColorSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: string;
  caption?: ReactNode;
  selected?: boolean;
  edited?: boolean;
  transparent?: boolean;
  unused?: boolean;
  mixed?: boolean;
  marks?: readonly ReactNode[];
  focusRing?: SwatchFocusRing;
  size?: ControlSize;
}

export type { ColorSwatchProps, SwatchFocusRing };
