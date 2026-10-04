/* @layer renderer-components @kind types */
import type { SettingsRowHeadProps } from './SettingsRowHead.type';

interface SettingsRowCompactTextProps extends Omit<SettingsRowHeadProps, 'lead'> {
  description?: string;
}

export type { SettingsRowCompactTextProps };
