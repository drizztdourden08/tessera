/* @layer renderer-components @kind logic */
import { rangeBetween } from '../selection/range-between';
import type { SweepSession, SweepSessionInput } from './toggle-sweep.type';

const sweepSession = (input: SweepSessionInput): SweepSession => {
  const { first, value, order, onSet } = input;
  const touched = new Set<string>();
  let last = first;
  const touch = (key: string): void => {
    if (touched.has(key)) return;
    touched.add(key);
    onSet(key, value);
  };
  touch(first);
  return {
    value,
    over: (key) => {
      const keys = order ? rangeBetween(order, last, key) : [key];
      keys.forEach(touch);
      last = key;
    },
    keys: () => [...touched],
  };
};

export { sweepSession };
