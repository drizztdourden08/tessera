/* @layer renderer-components @kind data */
const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const LUMINANCE_WEIGHTS: readonly number[] = [0.2126, 0.7152, 0.0722];

const DARK_INK_FROM = 0.179;

const READABLE_CONTRAST = 4.5;

const DARK_GROUND = 0.02;

const LIFT_STEP = 0.05;

export { DARK_GROUND, DARK_INK_FROM, HEX_COLOR, LIFT_STEP, LUMINANCE_WEIGHTS, READABLE_CONTRAST };
