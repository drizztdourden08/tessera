/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { MenuHover } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarOrientation } from '../Toolbar.type';

type ToolMenuMode = 'closed' | 'hover' | 'focus';

interface ToolMenuParams {
  anchorRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  hoverOpen: boolean;
  disabled: boolean | undefined;
  orientation: ToolbarOrientation;
}

interface ToolMenu {
  mode: ToolMenuMode;
  open: boolean;
  close: () => void;
  toggle: () => void;
  hover: MenuHover;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export type { ToolMenu, ToolMenuMode, ToolMenuParams };
