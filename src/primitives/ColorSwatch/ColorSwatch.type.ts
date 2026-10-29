/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';
import type { SwatchCorner, SwatchCornerMarks, SwatchMarks } from './behavior/swatch-marks.type';

type SwatchFocusRing = 'inset' | 'apart';

type SwatchSize = ControlSize | 'xs';

interface ColorSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: string;
  caption?: ReactNode;
  selected?: boolean;
  edited?: boolean;
  transparent?: boolean;
  unused?: boolean;
  mixed?: boolean;
  marks?: SwatchMarks;
  focusRing?: SwatchFocusRing;
  fill?: boolean;
  size?: SwatchSize;
}

export type { ColorSwatchProps, SwatchCorner, SwatchCornerMarks, SwatchFocusRing, SwatchSize };
