/* @layer renderer-components @kind util */
import { POPOVER_GAP } from '../PatternInput.constants';
import type { FloatingPlacement } from '../../../primitives/Floating/Floating.type';

const popoverFallback = (rect: DOMRect): FloatingPlacement => ({ top: rect.bottom + POPOVER_GAP, left: rect.left });

export { popoverFallback };
