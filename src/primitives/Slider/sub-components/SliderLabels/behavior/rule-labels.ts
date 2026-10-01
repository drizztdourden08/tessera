/* @layer renderer-components @kind util */
import type { SliderScale } from '../../../behavior/slider-scale.type';
import { valueText } from '../../../behavior/value-text';
import type { LabelPlacement, LabelTemplate } from './label-rule.type';
import { parseLabelRule } from './parse-label-rule';
import { placementValues } from './placement-values';
import { renderTemplate } from './render-template';
import type { RuleLabels } from './rule-labels.type';

const defaultPlacements = (template: LabelTemplate | null): LabelPlacement[] =>
  template?.kind === 'words' ? [{ kind: 'count', count: template.words.length }] : [{ kind: 'steps' }];

const labelText = (template: LabelTemplate | null, value: number, index: number, scale: SliderScale): string => {
  if (template === null) return valueText(value, scale);
  if (template.kind === 'words') return template.words[index] ?? valueText(value, scale);
  return renderTemplate(template.parts, value, scale);
};

const ruleLabels = (rule: string, scale: SliderScale): RuleLabels => {
  try {
    const { placements, template } = parseLabelRule(rule);
    const placed = placementValues(placements ?? defaultPlacements(template), scale);
    const points = placed.map((point, index) => ({ value: point.value, label: point.text ?? labelText(template, point.value, index, scale) }));
    return { points, error: null };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { points: [], error: `Slider labels "${rule}": ${reason} The slider shows no labels until the rule reads.` };
  }
};

export { ruleLabels };
