/* @layer renderer-components @kind types */
import type { Hint, HintReport } from '../hint/hint.type';

type ToggleSize = 'xs' | 'md';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  link?: string;
  size?: ToggleSize;
  hint?: Hint;
  onHint?: HintReport;
  'aria-label'?: string;
}

type ToggleTextProps = Pick<ToggleProps, 'label' | 'description' | 'link'>;

export type {
  ToggleProps,
  ToggleSize,
  ToggleTextProps,
};
