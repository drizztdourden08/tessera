/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WindowTitleBarAction } from '../WindowTitleBar.type';

interface TitleBarTipProps {
  label: string;
  shortcut?: WindowTitleBarAction['shortcut'];
  away?: boolean;
  quiet?: boolean;
  children: ReactNode;
}

export type { TitleBarTipProps };
