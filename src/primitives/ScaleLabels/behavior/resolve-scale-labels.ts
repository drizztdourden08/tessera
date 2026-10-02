/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { decimalsOf } from '../../value-rule/decimals-of';
import { formatValueRule } from '../../value-rule/format-value-rule';
import type { ValueScale } from '../../value-rule/value-rule.type';
import { MAX_FUNCTION_STEPS } from '../ScaleLabels.constants';
import type { ScaleLabel, ScaleLabelEntry, ScaleLabelSource } from '../ScaleLabels.type';
import { warnOnce } from './warn-once';

const inScale = (value: number, scale: ValueScale): boolean => Number.isFinite(value) && value >= scale.min && value <= scale.max;

const shows = (label: ReactNode): boolean => label !== null && label !== undefined && label !== false && label !== '';

const entryLabels = (entries: readonly ScaleLabelEntry[], scale: ValueScale): ScaleLabel[] =>
  entries
    .map(([value, label]) => ({ value, label }))
    .filter((point) => inScale(point.value, scale) && shows(point.label))
    .sort((a, b) => a.value - b.value);

const functionLabels = (labelOf: (value: number) => ReactNode, scale: ValueScale): ScaleLabel[] => {
  const count = Math.floor((scale.max - scale.min) / scale.step + 1e-9) + 1;
  if (!(count <= MAX_FUNCTION_STEPS)) {
    warnOnce(`Scale labels: a label function runs once per step, and this scale has ${count} steps, more than ${MAX_FUNCTION_STEPS}. Pass a rule or a list of [value, label] pairs instead.`);
    return [];
  }
  const decimals = Math.min(10, decimalsOf(scale.min, scale.step));
  return Array.from({ length: count }, (_, index) => Number((scale.min + index * scale.step).toFixed(decimals)))
    .map((value) => ({ value, label: labelOf(value) }))
    .filter((point) => shows(point.label));
};

const ruleLabels = (rule: string, scale: ValueScale): ScaleLabel[] => {
  const { marks, error } = formatValueRule(rule, scale);
  if (error !== null) warnOnce(`${error} No labels are drawn until the rule reads.`);
  return marks.map((mark) => ({ value: mark.value, label: mark.text }));
};

const resolveScaleLabels = (labels: ScaleLabelSource | undefined, scale: ValueScale): ScaleLabel[] => {
  if (labels === undefined) return scale.stops ? ruleLabels('steps', scale) : [];
  if (typeof labels === 'function') return functionLabels(labels, scale);
  if (typeof labels !== 'string') return entryLabels(labels, scale);
  return labels.trim() === '' ? [] : ruleLabels(labels, scale);
};

export { resolveScaleLabels };
