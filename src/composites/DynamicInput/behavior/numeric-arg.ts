/* @layer renderer-components @kind util */
import { PLACES_ARG, RANGE_ARG, STEP_ARG, WHOLE_ARG, WHOLE_ARGS } from './parse-pattern.constants';
import type { SlotArg } from './slot-arg.type';

const rangeArg = (arg: string): SlotArg | null => {
  const match = RANGE_ARG.exec(arg);
  if (match === null || arg === '..') return null;
  const [, low, high] = match;
  return {
    key: 'range',
    patch: { ...(low === undefined ? {} : { min: Number(low) }), ...(high === undefined ? {} : { max: Number(high) }) },
  };
};

const wholeArg = (arg: string): SlotArg | null => {
  const match = WHOLE_ARG.exec(arg);
  const build = match === null ? undefined : WHOLE_ARGS[match[1] ?? ''];
  return build === undefined || match === null ? null : build(Number(match[2]));
};

const stepArg = (arg: string): SlotArg | null => {
  const match = STEP_ARG.exec(arg);
  return match === null ? null : { key: 'step', patch: { step: Number(match[1]) } };
};

const numericArg = (arg: string): SlotArg | null => {
  if (PLACES_ARG.test(arg)) return { key: 'places', patch: { places: Number(arg) } };
  return rangeArg(arg) ?? wholeArg(arg) ?? stepArg(arg);
};

export { numericArg };
