/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SettingsPageHeadProps {
  icon: ReactNode;
  title: string;
  backdrop?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export type { SettingsPageHeadProps };
