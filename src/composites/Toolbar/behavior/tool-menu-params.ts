/* @layer renderer-components @kind util */
import type { RefObject } from 'react';
import { HOLD_DELAY } from '../Toolbar.constants';
import type { ToolSetup } from './tool-setup.type';
import type { ToolbarContextValue } from './toolbar-context.type';
import type { ToolMenuParams } from './useToolMenu.type';

const toolMenuParams = (setup: ToolSetup, anchorRef: RefObject<HTMLElement | null>, context: ToolbarContextValue): ToolMenuParams => {
  const { props, menu } = setup;
  return {
    anchorRef,
    enabled: menu,
    hoverOpen: props.hoverOpen === true,
    holdOpen: props.holdOpen === true,
    holdDelay: props.holdDelay ?? HOLD_DELAY,
    dwell: props.dwell,
    disabled: props.disabled,
    orientation: context.orientation,
    menuSide: context.menuSide,
  };
};

export { toolMenuParams };
