/* @layer renderer-components @kind util */
import { LADDER_EPSILON } from '../Slider.constants';

const ladderNext = (value: number, direction: 1 | -1, ladder: readonly number[]): number => {
  const stops = [...ladder].sort((left, right) => left - right);
  const next = direction > 0
    ? stops.find((stop) => stop > value + LADDER_EPSILON)
    : stops.reverse().find((stop) => stop < value - LADDER_EPSILON);
  return next ?? value;
};

export { ladderNext };
