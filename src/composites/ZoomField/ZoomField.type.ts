/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ZoomSliderPlacement = 'beside' | 'below';

interface ZoomFieldProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label?: string;
  presets?: readonly number[];
  slider?: ZoomSliderPlacement;
  actions?: ReactNode;
  disabled?: boolean;
  className?: string;
}

interface ZoomPresetsProps {
  presets: readonly number[];
  value: number;
  label: string;
  disabled: boolean | undefined;
  onPick: (value: number) => void;
}

interface ZoomSliderProps {
  value: number;
  min: number;
  max: number;
  ladder: readonly number[];
  label: string;
  placement: ZoomSliderPlacement;
  disabled: boolean | undefined;
  onChange: (value: number) => void;
}

export type { ZoomFieldProps, ZoomPresetsProps, ZoomSliderPlacement, ZoomSliderProps };
