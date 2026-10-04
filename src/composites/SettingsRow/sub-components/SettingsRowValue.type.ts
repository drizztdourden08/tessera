/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { PointHandlers } from '../behavior/row-pointed.type';

interface SettingsRowValueProps {
  handlers: PointHandlers;
  children: ReactNode;
}

export type { SettingsRowValueProps };
