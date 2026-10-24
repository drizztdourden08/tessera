/* @layer renderer-components @kind data */
import type { AnchoredPlacement } from '../../Anchored';
import type { TooltipPlacement } from '../Tooltip.type';

const TOOLTIP_PLACES: Readonly<Record<TooltipPlacement, AnchoredPlacement>> = {
  top: 'top-center',
  bottom: 'bottom-center',
  right: 'right-center',
  left: 'left-center',
};

export { TOOLTIP_PLACES };
