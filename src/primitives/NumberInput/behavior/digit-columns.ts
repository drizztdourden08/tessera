/* @layer renderer-components @kind util */
import { toNumber } from './to-number';

const digitColumns = (sizeToContent: boolean, max: unknown, step: unknown): number | undefined => {
  const maxNum = sizeToContent ? toNumber(max) : undefined;
  if (maxNum === undefined) return undefined;
  const whole = Math.max(1, Math.abs(maxNum).toString().length);
  const stepN = toNumber(step);
  const places = stepN !== undefined && !Number.isInteger(stepN)
    ? (String(stepN).split('.')[1]?.length ?? 1)
    : 0;
  return whole + (places > 0 ? places + 1 : 0);
};

export { digitColumns };
