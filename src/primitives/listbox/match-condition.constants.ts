/* @layer renderer-components @kind data */
import { asNumber } from './as-number';
import { isBlank } from './is-blank';
import type { ConditionCheck } from './condition-check.type';

const CONDITION_CHECKS: readonly ConditionCheck[] = [
  (condition, subject) => condition.equals === undefined || subject === condition.equals,
  (condition, subject) => condition.in === undefined || condition.in.includes(subject),
  (condition, subject) => condition.not === undefined || subject !== condition.not,
  (condition, subject) => condition.empty === undefined || isBlank(subject) === condition.empty,
  (condition, subject) => condition.above === undefined || (asNumber(subject) ?? -Infinity) > condition.above,
  (condition, subject) => condition.below === undefined || (asNumber(subject) ?? Infinity) < condition.below,
  (condition, _subject, context) => condition.selected === undefined || context.selected === condition.selected,
  (condition, _subject, context) => condition.active === undefined || context.active === condition.active,
  (condition, _subject, context) => condition.disabled === undefined || context.disabled === condition.disabled,
];

export { CONDITION_CHECKS };
