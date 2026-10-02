/* @layer renderer-components @kind util */
import { parseRule } from './parse-rule';
import type { ValueRuleParse } from './value-rule.type';

const parseValueRule = (text: string): ValueRuleParse => {
  try {
    return { rule: parseRule(text), error: null };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { rule: null, error: `Value rule "${text}": ${reason}` };
  }
};

export { parseValueRule };
