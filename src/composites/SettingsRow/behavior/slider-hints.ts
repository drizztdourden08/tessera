/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import { SLIDER_HINT_SAMPLES } from '../SettingsRow.constants';
import type { SettingsInputOf } from '../SettingsRow.type';

const sampleValues = (min: number, max: number, step: number): number[] => {
  const total = Math.floor((max - min) / step) + 1;
  const stride = Math.max(1, Math.ceil(total / SLIDER_HINT_SAMPLES));
  const values = Array.from({ length: Math.ceil(total / stride) }, (_, at) => min + at * stride * step);
  return values.at(-1) === max ? values : [...values, max];
};

const sliderHints = (input: SettingsInputOf<'slider'>): readonly Hint[] => {
  const { hintOf, formatValue, min, max, step = 1 } = input;
  if (hintOf === undefined) return [];
  const values = sampleValues(min, max, step);
  const label = values.map((value) => formatValue?.(value) ?? String(value)).reduce((long, next) => (next.length > long.length ? next : long), '');
  const descriptions = new Set(values.map(hintOf).filter((text) => text !== undefined));
  return [...descriptions].map((description) => ({ label, description }));
};

export { sliderHints };
