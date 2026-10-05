/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { STRENGTH_LEVELS } from '../PasswordInput.constants';
import { checkRules } from './check-rules';
import type { PasswordChecks, PasswordChecksParams } from './checks.type';
import { describeChange } from './describe-change';
import { scoreOf } from './score-of';
import { useSettledAnnouncement } from './useSettledAnnouncement';

const usePasswordChecks = (params: PasswordChecksParams): PasswordChecks => {
  const { value, rules, strength } = params;
  const { password } = useTesseraStrings();
  const checks = useMemo(() => checkRules(rules, value), [rules, value]);
  const score = scoreOf(strength, value, checks);
  const level = score === null || value === '' ? null : STRENGTH_LEVELS[score];
  const met = checks.filter((check) => check.met).map((check) => check.id);
  const announcement = useSettledAnnouncement({ met, level }, value, (before, after) => describeChange(before, after, checks, password));
  return { checks, score, level, announcement };
};

export { usePasswordChecks };
