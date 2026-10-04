/* @layer renderer-components @kind data */
import type { SparklineGeometry } from './Sparkline.type';

const VIEW_SIZE = 100;

const VIEW_BOX = `0 0 ${VIEW_SIZE} ${VIEW_SIZE}`;

const EMPTY_GEOMETRY: SparklineGeometry = { line: '', area: '', end: null };

const DEFAULT_BAND_TONE = 'warning';

export { DEFAULT_BAND_TONE, EMPTY_GEOMETRY, VIEW_BOX, VIEW_SIZE };
