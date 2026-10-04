/* @layer renderer-components @kind types */
import type { SettingsInputOf } from '../SettingsRow.type';

interface SettingsSelectProps {
  input: SettingsInputOf<'select'>;
  label: string;
  disabled: boolean;
}

export type { SettingsSelectProps };
