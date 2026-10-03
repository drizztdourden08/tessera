/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import type { CheckSnapshot, RuleCheck } from './checks.type';

const describeChange = (before: CheckSnapshot, after: CheckSnapshot, checks: readonly RuleCheck[], strings: TesseraStrings['password']): string => {
  const flipped = checks.filter((check) => before.met.includes(check.id) !== after.met.includes(check.id));
  const parts = flipped.map((check) => strings.ruleState(check.label, check.met ? strings.met : strings.notMet));
  if (after.level !== null && after.level !== before.level) parts.push(strings.strengthIs(strings[after.level]));
  return parts.join('. ');
};

export { describeChange };
