/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ToolbarBadge, ToolbarItemBase } from '../Toolbar.type';

interface ToolbarKeyBadgeProps {
  shortcut: ToolbarItemBase['shortcut'];
}

interface ToolbarToolDecorProps {
  badge: ToolbarBadge | undefined;
  keyBadge: boolean;
  shortcut: ToolbarItemBase['shortcut'];
  children: ReactNode;
}

export type { ToolbarKeyBadgeProps, ToolbarToolDecorProps };
