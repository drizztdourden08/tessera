/* @layer renderer-components @kind util */
import { EPSILON } from './ladder-step.constants';

const ladderStep = (value: number, count: number, ladder: readonly number[]): number => {
  const stops = [...new Set(ladder)].sort((left, right) => left - right);
  const last = stops.length - 1;
  if (last < 0 || count === 0) return value;
  const up = count > 0;
  let current = value;
  for (let moves = Math.abs(count); moves > 0; moves -= 1) {
    const next = up ? stops.find((stop) => stop > current + EPSILON) : [...stops].reverse().find((stop) => stop < current - EPSILON);
    if (next === undefined) return up ? Math.max(current, stops[last] ?? current) : Math.min(current, stops[0] ?? current);
    current = next;
  }
  return current;
};

export { ladderStep };
