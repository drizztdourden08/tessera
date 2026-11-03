/* @layer renderer-components @kind util */
import type { ValueScale } from '../../value-rule/value-rule.type';
import { LOG_RESOLUTION } from '../Slider.constants';
import { logValueAt } from './log-value-at';
import { snapValue } from './snap-value';

const valueOfThumb = (raw: number, scale: ValueScale): number =>
  (scale.curve === 'log' ? snapValue(logValueAt(raw / LOG_RESOLUTION, scale), scale) : raw);

export { valueOfThumb };
