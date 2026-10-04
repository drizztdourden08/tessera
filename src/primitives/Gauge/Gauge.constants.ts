/* @layer renderer-components @kind data */
import { arcPath } from './behavior/arc-path';

const VIEW_BOX = '0 0 100 100';

const ARC_LENGTH = 100;

const ARC_STROKE = 9;

const ARC = arcPath({ x: 50, y: 50, radius: 42 }, 135, 405);

const NO_ZONES = [] as const;

const DEFAULT_SHARES = { warning: 0.6, danger: 0.85 } as const;

export { ARC, ARC_LENGTH, ARC_STROKE, DEFAULT_SHARES, NO_ZONES, VIEW_BOX };
