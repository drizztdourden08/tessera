/* @layer renderer-components @kind data */
import type { ColorMode } from '../ColorPicker.type';

const MODE_LABELS: Record<ColorMode, string> = { hsv: 'HSV', oklch: 'OKLCH', rgb: 'RGB' };

const NO_MODES: readonly ColorMode[] = [];

export { MODE_LABELS, NO_MODES };
