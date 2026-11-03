/* @layer renderer-components @kind util */
import type { ValueScale } from '../../value-rule/value-rule.type';
import { LOG_RESOLUTION } from '../Slider.constants';

const thumbScale = (scale: ValueScale): Pick<ValueScale, 'min' | 'max' | 'step'> =>
  (scale.curve === 'log' ? { min: 0, max: LOG_RESOLUTION, step: 1 } : scale);

export { thumbScale };
