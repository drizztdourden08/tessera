/* @layer renderer-components @kind util */
import { logFraction } from '../../value-rule/log-fraction';
import type { ValueScale } from '../../value-rule/value-rule.type';
import { LOG_RESOLUTION } from '../Slider.constants';

const thumbValue = (value: number, scale: ValueScale): number =>
  (scale.curve === 'log' ? Math.round(logFraction(value, scale) * LOG_RESOLUTION) : value);

export { thumbValue };
