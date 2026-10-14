/* @layer renderer-components @kind data */
import type { ControlSize } from '../field-control/field-control.type';

const SEGMENT_ICON_SIZES: Readonly<Record<ControlSize, number>> = { sm: 12, md: 16 };

const ACTIVE_SEGMENT = '[aria-checked="true"]';

const INDICATOR_INSET = 2;

const SEGMENT_SELECTOR = '[role="radio"]';

const SEGMENT_STEPS: Readonly<Record<string, number>> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

export { ACTIVE_SEGMENT, INDICATOR_INSET, SEGMENT_ICON_SIZES, SEGMENT_SELECTOR, SEGMENT_STEPS };
