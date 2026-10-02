/* @layer renderer-components @kind util */
import { parseValueRule } from './parse-value-rule';
import { placementValues } from './placement-values';
import { renderTemplate } from './render-template';
import type { RulePlacement, RuleTemplate, ValueRule, ValueRuleMarks, ValueScale } from './value-rule.type';
import { valueText } from './value-text';

const defaultPlacements = (template: RuleTemplate | null): RulePlacement[] =>
  template?.kind === 'words' ? [{ kind: 'count', count: template.words.length }] : [{ kind: 'steps' }];

const markText = (template: RuleTemplate | null, value: number, index: number, scale: ValueScale): string => {
  if (template === null) return valueText(value, scale);
  if (template.kind === 'words') return template.words[index] ?? valueText(value, scale);
  return renderTemplate(template.parts, value, scale);
};

const marksOf = (rule: ValueRule, scale: ValueScale): ValueRuleMarks => {
  try {
    const placed = placementValues(rule.placements ?? defaultPlacements(rule.template), scale);
    const marks = placed.map((point, index) => ({ value: point.value, text: point.text ?? markText(rule.template, point.value, index, scale) }));
    return { marks, error: null };
  } catch (error) {
    return { marks: [], error: error instanceof Error ? error.message : String(error) };
  }
};

const formatValueRule = (rule: ValueRule | string, scale: ValueScale): ValueRuleMarks => {
  if (typeof rule !== 'string') return marksOf(rule, scale);
  const parsed = parseValueRule(rule);
  if (parsed.rule === null) return { marks: [], error: parsed.error };
  const { marks, error } = marksOf(parsed.rule, scale);
  return { marks, error: error === null ? null : `Value rule "${rule}": ${error}` };
};

export { formatValueRule };
