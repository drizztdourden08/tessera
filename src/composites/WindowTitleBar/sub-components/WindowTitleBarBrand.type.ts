/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WindowTitleBarInstance } from '../WindowTitleBar.type';

interface WindowTitleBarBrandProps {
  title: ReactNode;
  logo?: string;
  instance: WindowTitleBarInstance | null;
}

export type { WindowTitleBarBrandProps };
