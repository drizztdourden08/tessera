/* @layer renderer-components @kind types */
import type { SettingsRowHeadProps } from './SettingsRowHead.type';
import type { SettingsRowLineProps } from './SettingsRowLine.type';

interface SettingsRowTextProps extends SettingsRowLineProps, Omit<SettingsRowHeadProps, 'lead'> {
  description?: string;
  descriptionLines?: number;
}

export type { SettingsRowTextProps };
