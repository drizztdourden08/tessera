/* @layer renderer-components @kind util */
import type { ValueScale } from '../../value-rule/value-rule.type';

const highlightClass = (value: number, highlight: readonly [number, number] | undefined): string | false => {
  if (!highlight) return false;
  return value >= highlight[0] && value <= highlight[1] ? 'scale-labels__mark--in' : 'scale-labels__mark--out';
};

const markClass = (value: number, scale: ValueScale, highlight: readonly [number, number] | undefined, shown: boolean): string => [
  'scale-labels__mark',
  value <= scale.min && 'scale-labels__mark--start',
  value >= scale.max && 'scale-labels__mark--end',
  highlightClass(value, highlight),
  !shown && 'scale-labels__mark--hidden',
].filter(Boolean).join(' ');

export { markClass };
