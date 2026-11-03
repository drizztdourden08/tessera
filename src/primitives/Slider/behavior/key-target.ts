/* @layer renderer-components @kind util */
import { clampValue } from './clamp-value';
import { keyDelta } from './key-delta';
import { ladderNext } from './ladder-next';
import { thumbValue } from './thumb-value';
import { valueOfThumb } from './value-of-thumb';
import { LOG_KEY_SHARE } from '../Slider.constants';
import type { KeyTargetParams } from './key-target.type';

const keyTarget = ({ key, value, scale, keyStep, ladder }: KeyTargetParams): number | null => {
  const direction = keyDelta(key, 1);
  if (direction === 0) return null;
  if (ladder !== undefined && ladder.length > 0) return clampValue(ladderNext(value, direction > 0 ? 1 : -1, ladder), scale);
  if (scale.curve === 'log') return valueOfThumb(thumbValue(value, scale) + direction * (keyStep ?? LOG_KEY_SHARE), scale);
  return keyStep ? clampValue(value + direction * keyStep, scale) : null;
};

export { keyTarget };
