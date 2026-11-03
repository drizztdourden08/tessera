/* @layer renderer-components @kind logic */
import { moveSet } from '../../reorder/move-set';

const listPosition = (keys: readonly string[], moving: readonly string[], to: number): number =>
  moveSet(keys, moving, to).indexOf(moving[0] ?? '') + 1;

export { listPosition };
