/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../Icon/Icon.type';
import type { ControlSize } from './field-control.type';

type InputAdornmentIcon = IconName | Exclude<ReactNode, string>;

interface InputAdornmentMark {
  icon: InputAdornmentIcon;
  label?: string;
  onClick?: never;
}

interface InputAdornmentAction {
  icon: InputAdornmentIcon;
  label: string;
  onClick: () => void;
}

type InputAdornment = InputAdornmentMark | InputAdornmentAction;

interface AdornmentIconProps {
  icon: InputAdornmentIcon;
  size: number;
}

interface InputAdornmentViewProps {
  adornment: InputAdornment;
  size: ControlSize;
  disabled?: boolean;
  focusable?: boolean;
  className?: string;
}

export type { AdornmentIconProps, InputAdornment, InputAdornmentAction, InputAdornmentIcon, InputAdornmentMark, InputAdornmentViewProps };
