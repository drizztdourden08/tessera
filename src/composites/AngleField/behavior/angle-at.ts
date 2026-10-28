/* @layer renderer-components @kind util */
import type { DialPoint, DialRect } from '../AngleField.type';
import { RADIANS_TO_DEGREES } from './angle-at.constants';
import { normaliseAngle } from './normalise-angle';

const angleAt = (point: DialPoint, rect: DialRect): number => {
  const dx = point.x - (rect.left + rect.width / 2);
  const dy = point.y - (rect.top + rect.height / 2);
  return normaliseAngle(Math.atan2(dy, dx) * RADIANS_TO_DEGREES);
};

export { angleAt };
