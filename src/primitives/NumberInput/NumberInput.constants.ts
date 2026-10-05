/* @layer renderer-components @kind data */
import type { ControlSize } from '../field-control/field-control.type';

const SPIN_GLYPH_SIZES: Readonly<Record<ControlSize, number>> = { md: 12, sm: 10 };

const SIDE_GLYPH_SIZES: Readonly<Record<ControlSize, number>> = { md: 16, sm: 14 };

export { SIDE_GLYPH_SIZES, SPIN_GLYPH_SIZES };
