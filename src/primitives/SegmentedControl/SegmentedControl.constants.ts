/* @layer renderer-components @kind data */
import type { SegmentSize } from './SegmentedControl.type';

const SEGMENT_ICON_SIZES: Readonly<Record<SegmentSize, number>> = { sm: 12, 'sm-plus': 14, md: 16 };

const ACTIVE_SEGMENT = '[aria-checked="true"]';

const INDICATOR_INSET = 2;

const SEGMENT_SELECTOR = '[role="radio"]';

const SEGMENT_STEPS: Readonly<Record<string, number>> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

export { ACTIVE_SEGMENT, INDICATOR_INSET, SEGMENT_ICON_SIZES, SEGMENT_SELECTOR, SEGMENT_STEPS };
