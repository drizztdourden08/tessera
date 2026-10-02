/* @layer renderer-components @kind util */
import type { ValueScale } from '../../value-rule/value-rule.type';
import type { RailPoint } from './rail-point.type';
import { trackFraction } from './track-fraction';

const railPoint = (clientX: number, rect: Pick<DOMRect, 'left' | 'width' | 'height'>, scale: ValueScale): RailPoint => {
  const span = scale.max - scale.min;
  const travel = rect.width - rect.height;
  return {
    at: scale.min + trackFraction(clientX, rect) * span,
    reach: travel > 0 ? (rect.height / 2 / travel) * span : 0,
  };
};

export { railPoint };
