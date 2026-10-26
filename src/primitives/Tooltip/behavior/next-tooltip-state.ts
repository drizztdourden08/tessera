/* @layer renderer-components @kind util */
import { TOOLTIP_CLOSED } from './tooltip-state.constants';
import type { TooltipEvent, TooltipState } from './tooltip-state.type';

const nextTooltipState = (state: TooltipState, event: TooltipEvent): TooltipState => {
  switch (event) {
    case 'enter': return state.hover ? state : { ...state, hover: true };
    case 'press': return { hover: true, focus: false, dismissed: false };
    case 'focus': return { ...state, focus: true };
    case 'scroll': return state.hover ? { ...state, hover: false } : state;
    case 'dismiss': return { ...state, dismissed: true };
    case 'leave':
    case 'blur': return TOOLTIP_CLOSED;
  }
};

export { nextTooltipState };
