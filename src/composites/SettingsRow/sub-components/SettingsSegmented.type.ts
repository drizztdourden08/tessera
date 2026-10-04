/* @layer renderer-components @kind types */
import type { SettingsInputOf } from '../SettingsRow.type';

interface SettingsSegmentedProps {
  input: SettingsInputOf<'segmented'>;
  label: string;
  disabled: boolean;
  compact: boolean;
}

export type { SettingsSegmentedProps };
