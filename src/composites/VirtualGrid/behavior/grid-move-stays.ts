/* @layer renderer-components @kind logic */
import { moveSet } from '../../reorder/move-set';
import type { GridMoveStaysInput } from './grid-move-stays.type';

const gridMoveStays = (input: GridMoveStaysInput): boolean => {
  const { keys, moving, index, section, owners, indexOfKey } = input;
  const same = moveSet(keys, moving, index).every((key, at) => key === keys[at]);
  return same && (section === undefined || moving.every((key) => owners[indexOfKey.get(key) ?? -1] === section));
};

export { gridMoveStays };
