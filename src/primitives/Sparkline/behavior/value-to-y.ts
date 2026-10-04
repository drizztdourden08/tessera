/* @layer renderer-components @kind logic */
import { VIEW_SIZE } from '../Sparkline.constants';
import type { SparklineDomain } from '../Sparkline.type';
import { roundCoordinate } from './round-coordinate';

const valueToY = (value: number, domain: SparklineDomain): number => {
  const share = (value - domain.low) / (domain.high - domain.low);
  return roundCoordinate(VIEW_SIZE * (1 - Math.min(1, Math.max(0, share))));
};

export { valueToY };
