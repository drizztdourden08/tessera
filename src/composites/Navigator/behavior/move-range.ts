/* @layer renderer-components @kind logic */
import { KEPT_SHARE } from '../Navigator.constants';

const moveRange = (size: number, room: number, unclamped: boolean): [number, number] =>
  (unclamped ? [-size * (1 - KEPT_SHARE), room - size * KEPT_SHARE] : [0, Math.max(0, room - size)]);

export { moveRange };
