/* @layer renderer-components @kind util */
import { FULL_TURN } from '../AngleField.constants';

const snapLadder = (snap: number | undefined): readonly number[] | undefined => {
  if (snap === undefined || snap <= 0 || snap > FULL_TURN / 2) return undefined;
  const count = Math.round(FULL_TURN / snap);
  return Array.from({ length: count + 2 }, (_stop, index) => (index - 1) * snap);
};

export { snapLadder };
