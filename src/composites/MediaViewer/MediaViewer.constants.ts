/* @layer renderer-components @kind data */
const ZOOM_STEPS: readonly number[] = [1, 2, 4, 8, 16];

const PIXEL_ART_MAX_SIDE = 256;

const DIALOG_SELECTOR = '[role="dialog"]';

const KEYS_LEFT_TO_CONTROL = 'video, input, textarea, select, [role="slider"], [contenteditable="true"]';

export { DIALOG_SELECTOR, KEYS_LEFT_TO_CONTROL, PIXEL_ART_MAX_SIDE, ZOOM_STEPS };
