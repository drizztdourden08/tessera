/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SettingsRowAction } from '../SettingsRow.type';

interface SettingsRowEndProps {
  actions?: readonly SettingsRowAction[];
  disabled: boolean;
  children: ReactNode;
}

export type { SettingsRowEndProps };
