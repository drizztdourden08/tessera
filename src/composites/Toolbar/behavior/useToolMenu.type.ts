/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { MenuHover } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarMenuSide, ToolbarOrientation } from '../Toolbar.type';
import type { HoldOpen } from './useHoldOpen.type';

type ToolMenuMode = 'closed' | 'hover' | 'focus' | 'hold';

interface ToolMenuParams {
  anchorRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  hoverOpen: boolean;
  holdOpen: boolean;
  holdDelay: number;
  dwell: number | undefined;
  disabled: boolean | undefined;
  orientation: ToolbarOrientation;
  menuSide: ToolbarMenuSide;
}

interface ToolMenu {
  mode: ToolMenuMode;
  open: boolean;
  close: () => void;
  toggle: () => void;
  hover: MenuHover;
  hold: HoldOpen;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export type { ToolMenu, ToolMenuMode, ToolMenuParams };
