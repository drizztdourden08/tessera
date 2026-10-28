/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SwatchGroup {
  label: string;
  colors: readonly string[];
}

type ColorMode = 'hsv' | 'oklch' | 'rgb';

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
  disableAlpha?: boolean;
  title?: string;
  name?: ReactNode;
  footer?: ReactNode;
  modes?: readonly ColorMode[];
  mode?: ColorMode;
  onModeChange?: (mode: ColorMode) => void;
  original?: string;
  word?: number;
  snapped?: boolean;
  onReset?: () => void;
  onClose?: () => void;
  swatchGroups?: readonly SwatchGroup[];
}

export type { ColorMode, ColorPickerProps, SwatchGroup };
