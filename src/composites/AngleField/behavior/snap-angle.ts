/* @layer renderer-components @kind util */
import { normaliseAngle } from './normalise-angle';

const snapAngle = (degrees: number, snap: number | undefined): number => {
  const unit = snap !== undefined && snap > 0 ? snap : 1;
  return normaliseAngle(Math.round(degrees / unit) * unit);
};

export { snapAngle };
