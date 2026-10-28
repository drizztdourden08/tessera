/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ToolSetup } from '../behavior/tool-setup.type';
import type { ToolMenu } from '../behavior/useToolMenu.type';

interface ToolbarToolPopupsProps {
  setup: ToolSetup;
  tool: ToolMenu;
  anchorRef: RefObject<HTMLElement | null>;
}

export type { ToolbarToolPopupsProps };
