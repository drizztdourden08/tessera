/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SettingsItem } from '../SettingsRow.type';

interface SettingsRowHeadProps extends Pick<SettingsItem, 'title' | 'badge' | 'changed' | 'onReset'> {
  lead: ReactNode;
}

export type { SettingsRowHeadProps };
