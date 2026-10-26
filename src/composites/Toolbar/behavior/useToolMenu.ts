/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useHoverOpen } from '../../DropdownMenu/behavior/useHoverOpen';
import { toolOpenKey } from './tool-open-key';
import type { ToolMenu, ToolMenuMode, ToolMenuParams } from './useToolMenu.type';

const useToolMenu = (params: ToolMenuParams): ToolMenu => {
  const { anchorRef, enabled, hoverOpen, disabled, orientation, menuSide } = params;
  const [mode, setMode] = useState<ToolMenuMode>('closed');
  const open = enabled && mode !== 'closed';
  const close = (): void => setMode('closed');
  const hover = useHoverOpen({
    open,
    byHover: mode === 'hover',
    anchorRef,
    enabled: enabled && hoverOpen && disabled !== true,
    onOpen: () => setMode('hover'),
    onClose: close,
  });
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (!enabled || event.key !== toolOpenKey(orientation, menuSide)) return;
    event.preventDefault();
    event.stopPropagation();
    setMode('focus');
  };
  return { mode, open, close, toggle: () => setMode(open ? 'closed' : 'focus'), hover, onKeyDown };
};

export { useToolMenu };
