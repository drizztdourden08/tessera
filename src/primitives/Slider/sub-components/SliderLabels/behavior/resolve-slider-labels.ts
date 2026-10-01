/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import type { SliderScale } from '../../../behavior/slider-scale.type';
import type { SliderLabelEntry, SliderLabels } from '../../../Slider.type';
import { MAX_FUNCTION_STEPS } from '../SliderLabels.constants';
import type { SliderLabelPoint } from '../SliderLabels.type';
import { decimalsOf } from './decimals-of';
import { ruleLabels } from './rule-labels';
import { warnOnce } from './warn-once';

const inScale = (value: number, scale: SliderScale): boolean => Number.isFinite(value) && value >= scale.min && value <= scale.max;

const shows = (label: ReactNode): boolean => label !== null && label !== undefined && label !== false && label !== '';

const entryLabels = (entries: readonly SliderLabelEntry[], scale: SliderScale): SliderLabelPoint[] =>
  entries
    .map(([value, label]) => ({ value, label }))
    .filter((point) => inScale(point.value, scale) && shows(point.label))
    .sort((a, b) => a.value - b.value);

const functionLabels = (labelOf: (value: number) => ReactNode, scale: SliderScale): SliderLabelPoint[] => {
  const count = Math.floor((scale.max - scale.min) / scale.step + 1e-9) + 1;
  if (!(count <= MAX_FUNCTION_STEPS)) {
    warnOnce(`Slider labels: a label function runs once per step, and this slider has ${count} steps, more than ${MAX_FUNCTION_STEPS}. Pass a rule or a list of [value, label] pairs instead.`);
    return [];
  }
  const decimals = Math.min(10, decimalsOf(scale.min, scale.step));
  return Array.from({ length: count }, (_, index) => Number((scale.min + index * scale.step).toFixed(decimals)))
    .map((value) => ({ value, label: labelOf(value) }))
    .filter((point) => shows(point.label));
};

const resolveSliderLabels = (labels: SliderLabels | undefined, scale: SliderScale): SliderLabelPoint[] => {
  if (labels === undefined) return scale.stops ? ruleLabels('steps', scale).points : [];
  if (typeof labels === 'function') return functionLabels(labels, scale);
  if (typeof labels !== 'string') return entryLabels(labels, scale);
  if (labels.trim() === '') return [];
  const { points, error } = ruleLabels(labels, scale);
  if (error !== null) warnOnce(error);
  return points;
};

export { resolveSliderLabels };
