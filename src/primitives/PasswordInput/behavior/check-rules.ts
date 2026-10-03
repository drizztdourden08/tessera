/* @layer renderer-components @kind util */
import type { PasswordRule } from '../PasswordInput.type';
import type { RuleCheck } from './checks.type';

const checkRules = (rules: readonly PasswordRule[], value: string): readonly RuleCheck[] =>
  rules.map((rule) => ({ id: rule.id, label: rule.label, met: rule.test(value) }));

export { checkRules };
