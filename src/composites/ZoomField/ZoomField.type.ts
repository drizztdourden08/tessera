/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ZoomFieldProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label?: string;
  presets?: readonly number[];
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

export type { ZoomFieldProps, ZoomPresetsProps };
