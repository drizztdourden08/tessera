/* @layer renderer-components @kind logic */
import { INTO_BAND } from '../Tree.constants';
import type { DropZone } from './drop-target-of.type';

const zoneOf = (fraction: number, middle: boolean): DropZone => {
  if (middle && fraction >= INTO_BAND && fraction <= 1 - INTO_BAND) return 'into';
  return fraction < (middle ? INTO_BAND : 0.5) ? 'before' : 'after';
};

export { zoneOf };
