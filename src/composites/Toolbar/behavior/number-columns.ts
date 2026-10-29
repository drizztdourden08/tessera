/* @layer renderer-components @kind util */
import type { ToolbarNumber } from '../Toolbar.type';
import { FALLBACK_DIGITS, MAX_COLUMNS } from './number-columns.constants';

const widthOf = (value: number | undefined): number => (value === undefined || !Number.isFinite(value) ? 0 : Math.abs(value).toString().length + (value < 0 ? 1 : 0));

const placesOf = (step: number | undefined): number => {
  if (step === undefined || Number.isInteger(step)) return 0;
  return (String(step).split('.')[1]?.length ?? 1) + 1;
};

const numberColumns = (item: Pick<ToolbarNumber, 'min' | 'max' | 'step'>): number => {
  const whole = Math.max(widthOf(item.max), widthOf(item.min));
  return Math.min(MAX_COLUMNS, (whole === 0 ? FALLBACK_DIGITS : whole) + placesOf(item.step));
};

export { numberColumns };
