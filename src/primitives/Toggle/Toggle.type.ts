/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlName } from '../field-control/control-name.type';
import type { ControlSize } from '../field-control/field-control.type';
import type { ControlLabelSize } from '../field-control/label-size.type';
import type { Hint, HintReport } from '../hint/hint.type';

interface ToggleProps extends ControlName {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  help?: ReactNode;
  disabled?: boolean;
  id?: string;
  link?: string;
  size?: ControlSize;
  labelSize?: ControlLabelSize;
  hint?: Hint;
  onHint?: HintReport;
}

type ToggleTextProps = Pick<ToggleProps, 'label' | 'description' | 'help' | 'link'> & { labelId?: string };

export type {
  ToggleProps,
  ToggleTextProps,
};
