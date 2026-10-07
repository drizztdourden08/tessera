/* @layer renderer-components @kind types */
import type { ControlName } from '../field-control/control-name.type';
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintReport } from '../hint/hint.type';

interface ToggleProps extends ControlName {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  link?: string;
  size?: ControlSize;
  hint?: Hint;
  onHint?: HintReport;
}

type ToggleTextProps = Pick<ToggleProps, 'label' | 'description' | 'link'>;

export type {
  ToggleProps,
  ToggleTextProps,
};
