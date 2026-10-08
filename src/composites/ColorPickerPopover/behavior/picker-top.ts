/* @layer renderer-components @kind util */
import type { Bounds } from '../../../primitives/Portal/behavior/anchor-position.type';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { EDGE_MARGIN } from './useColorPickerPopover.constants';

const pickerTop = (anchorTop: number, height: number, dropUp: boolean, bounds: Bounds): number => (dropUp
  ? clampNumber(anchorTop, bounds.top + EDGE_MARGIN + height, bounds.bottom - EDGE_MARGIN)
  : clampNumber(anchorTop, bounds.top + EDGE_MARGIN, bounds.bottom - height - EDGE_MARGIN));

export { pickerTop };
