/* @layer renderer-components @kind util */
import type { ParsedPattern } from './parse-pattern.type';
import type { PatternRuleMessage, PatternSetup, PatternValue } from '../DynamicInput.type';

const textOf = (message: PatternRuleMessage): string | undefined =>
  message === null || message === undefined || message === '' ? undefined : message;

const ruleMessage = (parsed: ParsedPattern, value: PatternValue, setup: PatternSetup): string | undefined => {
  for (const slot of parsed.slots) {
    const message = textOf(setup.slots?.[slot.name]?.validate?.(value[slot.name] ?? null));
    if (message !== undefined) return message;
  }
  return textOf(setup.validate?.(value));
};

export { ruleMessage };
