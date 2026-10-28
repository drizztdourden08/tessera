/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ToolMenu } from '../behavior/useToolMenu.type';

interface ToolbarToolPanelProps {
  anchorRef: RefObject<HTMLElement | null>;
  tool: ToolMenu;
  label: string;
  render: (close: () => void) => ReactNode;
}

export type { ToolbarToolPanelProps };
