/* @layer renderer-components @kind logic */
import { CALIBRATED_SUFFIX } from '../StickPlot.constants';

const stickReadout = (x: number, y: number, calibrated: boolean): string =>
  `${x.toFixed(2)}, ${y.toFixed(2)}${calibrated ? CALIBRATED_SUFFIX : ''}`;

export { stickReadout };
