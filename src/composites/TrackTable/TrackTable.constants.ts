/* @layer renderer-components @kind data */
import type { TrackDrop } from './TrackTable.type';

const DROP_LEVELS: readonly TrackDrop[] = [1, 2, 3];

const TEMPLATE_PROPERTY = '--track-cols-';

const DEFAULT_FR = 1;

export { DEFAULT_FR, DROP_LEVELS, TEMPLATE_PROPERTY };
