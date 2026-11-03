/* @layer renderer-components @kind logic */
import { moveSet } from '../../reorder/move-set';

const listStays = (keys: readonly string[], moving: readonly string[], to: number): boolean =>
  moveSet(keys, moving, to).every((key, at) => key === keys[at]);

export { listStays };
