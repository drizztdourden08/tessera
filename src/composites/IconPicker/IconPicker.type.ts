/* @layer renderer-components @kind types */
import type { IconName } from '../../primitives/Icon';

type IconPickerValue =
  | { kind: 'icon'; name: IconName }
  | { kind: 'svg'; svg: string }
  | { kind: 'png'; dataUrl: string };

interface IconPickerProps {
  value: IconPickerValue;
  onChange: (value: IconPickerValue) => void;
  label: string;
  icons?: readonly IconName[];
  allowUpload?: boolean;
  disabled?: boolean;
  className?: string;
}

export type { IconPickerProps, IconPickerValue };
