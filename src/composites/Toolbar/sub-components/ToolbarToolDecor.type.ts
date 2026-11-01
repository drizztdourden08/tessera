/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ToolbarBadge } from '../Toolbar.type';

interface ToolbarToolDecorProps {
  badge: ToolbarBadge | undefined;
  children: ReactNode;
}

export type { ToolbarToolDecorProps };
